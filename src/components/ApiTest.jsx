import { useState, useEffect } from 'react'
import { healthCheck, announcements } from '../utils/api'

const ApiTest = () => {
  const [testResults, setTestResults] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = (test, status, message, data = null) => {
    setTestResults(prev => [...prev, { test, status, message, data, timestamp: new Date().toISOString() }])
  }

  const runTests = async () => {
    setIsRunning(true)
    setTestResults([])
    
    // Test 1: Basic connectivity
    try {
      addResult('Basic Connectivity', 'running', 'Testing basic API connectivity...')
      const pingResult = await healthCheck.ping()
      addResult('Basic Connectivity', 'success', 'API is reachable', pingResult)
    } catch (error) {
      addResult('Basic Connectivity', 'error', error.message)
    }

    // Test 2: Health check
    try {
      addResult('Health Check', 'running', 'Testing health endpoint...')
      const healthResult = await healthCheck.health()
      addResult('Health Check', 'success', 'Health check passed', healthResult)
    } catch (error) {
      addResult('Health Check', 'error', error.message)
    }

    // Test 3: Announcements
    try {
      addResult('Announcements', 'running', 'Testing announcements endpoint...')
      const announcementsResult = await announcements.list()
      addResult('Announcements', 'success', `Found ${announcementsResult.length} announcements`, announcementsResult)
    } catch (error) {
      addResult('Announcements', 'error', error.message)
    }

    // Test 4: CORS check
    try {
      addResult('CORS Check', 'running', 'Testing CORS configuration...')
      const response = await fetch('https://api.intelinfo.me/ping', {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'GET',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      })
      addResult('CORS Check', 'success', 'CORS preflight successful', { status: response.status })
    } catch (error) {
      addResult('CORS Check', 'error', error.message)
    }

    setIsRunning(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>API Connectivity Test</h2>
      <p>This tool helps diagnose API connection issues between the frontend and backend.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runTests} 
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            backgroundColor: isRunning ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunning ? 'Running Tests...' : 'Run API Tests'}
        </button>
      </div>

      <div>
        <h3>Test Results:</h3>
        {testResults.length === 0 ? (
          <p>No tests run yet. Click the button above to start testing.</p>
        ) : (
          <div>
            {testResults.map((result, index) => (
              <div 
                key={index} 
                style={{
                  padding: '10px',
                  margin: '5px 0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: result.status === 'success' ? '#d4edda' : 
                                 result.status === 'error' ? '#f8d7da' : '#fff3cd'
                }}
              >
                <strong>{result.test}</strong> - {result.status.toUpperCase()}
                <br />
                <small>{result.message}</small>
                {result.data && (
                  <details style={{ marginTop: '5px' }}>
                    <summary>View Data</summary>
                    <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                )}
                <br />
                <small style={{ color: '#666' }}>{result.timestamp}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h4>Environment Information:</h4>
        <ul>
          <li><strong>Current URL:</strong> {window.location.href}</li>
          <li><strong>Origin:</strong> {window.location.origin}</li>
          <li><strong>User Agent:</strong> {navigator.userAgent}</li>
          <li><strong>API Base:</strong> {import.meta.env.VITE_API_BASE || 'https://api.intelinfo.me'}</li>
        </ul>
      </div>
    </div>
  )
}

export default ApiTest
