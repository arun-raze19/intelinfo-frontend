import { useState, useEffect } from 'react'
import { healthCheck, announcements, messages, rag, auth } from '../utils/api'

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

    // Test 3: All health endpoints
    try {
      addResult('Ready Check', 'running', 'Testing ready endpoint...')
      const readyResult = await healthCheck.ready()
      addResult('Ready Check', 'success', 'Ready check passed', readyResult)
    } catch (error) {
      addResult('Ready Check', 'error', error.message)
    }

    try {
      addResult('Startup Check', 'running', 'Testing startup endpoint...')
      const startupResult = await healthCheck.startup()
      addResult('Startup Check', 'success', 'Startup check passed', startupResult)
    } catch (error) {
      addResult('Startup Check', 'error', error.message)
    }

    try {
      addResult('Test Endpoint', 'running', 'Testing test endpoint...')
      const testResult = await healthCheck.test()
      addResult('Test Endpoint', 'success', 'Test endpoint passed', testResult)
    } catch (error) {
      addResult('Test Endpoint', 'error', error.message)
    }

    try {
      addResult('Debug Endpoint', 'running', 'Testing debug endpoint...')
      const debugResult = await healthCheck.debug()
      addResult('Debug Endpoint', 'success', 'Debug endpoint passed', debugResult)
    } catch (error) {
      addResult('Debug Endpoint', 'error', error.message)
    }

    // Test 4: Announcements
    try {
      addResult('Announcements', 'running', 'Testing announcements endpoint...')
      const announcementsResult = await announcements.list()
      addResult('Announcements', 'success', `Found ${announcementsResult.length} announcements`, announcementsResult)
    } catch (error) {
      addResult('Announcements', 'error', error.message)
    }

    // Test 5: Messages (without token - should work for public access)
    try {
      addResult('Messages List', 'running', 'Testing messages endpoint (public)...')
      const messagesResult = await messages.list()
      addResult('Messages List', 'success', `Messages endpoint accessible`, messagesResult)
    } catch (error) {
      addResult('Messages List', 'error', error.message)
    }

    // Test 6: RAG Chat
    try {
      addResult('RAG Chat', 'running', 'Testing RAG chat endpoint...')
      const chatResult = await rag.chat('Hello, what is INTELINFO?')
      addResult('RAG Chat', 'success', 'RAG chat working', chatResult)
    } catch (error) {
      addResult('RAG Chat', 'error', error.message)
    }

    // Test 7: RAG Ingest
    try {
      addResult('RAG Ingest', 'running', 'Testing RAG ingest endpoint...')
      const ingestResult = await rag.ingest({ texts: ['Test content for RAG ingestion'] })
      addResult('RAG Ingest', 'success', 'RAG ingest working', ingestResult)
    } catch (error) {
      addResult('RAG Ingest', 'error', error.message)
    }

    // Test 8: CORS check
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

    // Test 9: Test message creation (this should work)
    try {
      addResult('Message Creation', 'running', 'Testing message creation...')
      const messageResult = await messages.create({
        contactName: 'Test User',
        contactEmail: 'test@example.com',
        subject: 'API Test',
        message: 'This is a test message from the API test tool'
      })
      addResult('Message Creation', 'success', 'Message creation working', messageResult)
    } catch (error) {
      addResult('Message Creation', 'error', error.message)
    }

    // Test 10: WebSocket connection test
    try {
      addResult('WebSocket Test', 'running', 'Testing WebSocket connection...')
      const wsUrl = 'wss://api.intelinfo.me/ws'
      const ws = new WebSocket(wsUrl)
      
      const wsTestPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          ws.close()
          reject(new Error('WebSocket connection timeout'))
        }, 5000)
        
        ws.onopen = () => {
          clearTimeout(timeout)
          ws.close()
          resolve('WebSocket connected successfully')
        }
        
        ws.onerror = (error) => {
          clearTimeout(timeout)
          reject(new Error('WebSocket connection failed'))
        }
      })
      
      const wsResult = await wsTestPromise
      addResult('WebSocket Test', 'success', wsResult)
    } catch (error) {
      addResult('WebSocket Test', 'error', error.message)
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
            {/* Summary */}
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h4>Summary:</h4>
              <p>
                <strong>Total Tests:</strong> {testResults.length} | 
                <strong style={{ color: 'green' }}> Passed:</strong> {testResults.filter(r => r.status === 'success').length} | 
                <strong style={{ color: 'red' }}> Failed:</strong> {testResults.filter(r => r.status === 'error').length}
              </p>
              {testResults.filter(r => r.status === 'error').length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <strong style={{ color: 'red' }}>Failed Tests:</strong>
                  <ul>
                    {testResults.filter(r => r.status === 'error').map((result, index) => (
                      <li key={index}>{result.test}: {result.message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Detailed Results */}
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
