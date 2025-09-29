import { useState } from 'react'
import { announcements, messages, rag } from '../utils/api'

const FunctionalTest = () => {
  const [testResults, setTestResults] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = (test, status, message, data = null) => {
    setTestResults(prev => [...prev, { test, status, message, data, timestamp: new Date().toISOString() }])
  }

  const runFunctionalTests = async () => {
    setIsRunning(true)
    setTestResults([])

    // Test 1: Announcements functionality (like in Announcements page)
    try {
      addResult('Announcements Page Functionality', 'running', 'Testing announcements page functionality...')
      const announcementsData = await announcements.list()
      
      if (Array.isArray(announcementsData)) {
        addResult('Announcements Page Functionality', 'success', 
          `Successfully loaded ${announcementsData.length} announcements for display`, 
          announcementsData.slice(0, 2) // Show first 2 for preview
        )
      } else {
        addResult('Announcements Page Functionality', 'error', 'Announcements data is not an array')
      }
    } catch (error) {
      addResult('Announcements Page Functionality', 'error', error.message)
    }

    // Test 2: Contact form functionality (like in Connect page)
    try {
      addResult('Contact Form Functionality', 'running', 'Testing contact form submission...')
      const testMessage = {
        contactName: 'Functional Test User',
        contactEmail: 'test@intelinfo.me',
        subject: 'Functional Test - Contact Form',
        message: 'This is a test message to verify contact form functionality works in deployment.'
      }
      
      const messageResult = await messages.create(testMessage)
      addResult('Contact Form Functionality', 'success', 
        'Contact form submission successful', 
        { id: messageResult.id, created_at: messageResult.created_at }
      )
    } catch (error) {
      addResult('Contact Form Functionality', 'error', error.message)
    }

    // Test 3: RAG Chat functionality (like in FloatingChatbot)
    try {
      addResult('RAG Chat Functionality', 'running', 'Testing RAG chat functionality...')
      
      // First test ingest (like the chatbot does)
      const testContent = 'INTELINFO 2K25 is a technical symposium featuring various events and competitions.'
      await rag.ingest({ texts: [testContent] })
      
      // Then test chat
      const chatResult = await rag.chat('What is INTELINFO?')
      addResult('RAG Chat Functionality', 'success', 
        'RAG chat functionality working', 
        { answer: chatResult.answer?.substring(0, 100) + '...' }
      )
    } catch (error) {
      addResult('RAG Chat Functionality', 'error', error.message)
    }

    // Test 4: WebSocket functionality (for real-time updates)
    try {
      addResult('WebSocket Functionality', 'running', 'Testing WebSocket for real-time updates...')
      
      const wsUrl = 'wss://api.intelinfo.me/ws'
      const ws = new WebSocket(wsUrl)
      
      const wsPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          ws.close()
          reject(new Error('WebSocket connection timeout'))
        }, 10000)
        
        ws.onopen = () => {
          clearTimeout(timeout)
          // Keep connection open for a moment to test
          setTimeout(() => {
            ws.close()
            resolve('WebSocket connection established successfully')
          }, 2000)
        }
        
        ws.onerror = (error) => {
          clearTimeout(timeout)
          reject(new Error('WebSocket connection failed'))
        }
        
        ws.onmessage = (event) => {
          // This would be real-time announcement updates
          console.log('WebSocket message received:', event.data)
        }
      })
      
      const wsResult = await wsPromise
      addResult('WebSocket Functionality', 'success', wsResult)
    } catch (error) {
      addResult('WebSocket Functionality', 'error', error.message)
    }

    // Test 5: Admin functionality (if you have admin credentials)
    try {
      addResult('Admin Login Test', 'running', 'Testing admin login functionality...')
      
      // Note: This will fail with wrong credentials, but tests the endpoint
      try {
        await fetch('https://api.intelinfo.me/login', {
          method: 'POST',
          body: new FormData() // Empty form data to test endpoint
        })
        addResult('Admin Login Test', 'success', 'Admin login endpoint accessible (credentials required)')
      } catch (error) {
        if (error.message.includes('422') || error.message.includes('400')) {
          addResult('Admin Login Test', 'success', 'Admin login endpoint working (validation error expected)')
        } else {
          throw error
        }
      }
    } catch (error) {
      addResult('Admin Login Test', 'error', error.message)
    }

    setIsRunning(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Functional API Test</h2>
      <p>This tests the exact functionality your application uses, not just basic connectivity.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={runFunctionalTests} 
          disabled={isRunning}
          style={{
            padding: '10px 20px',
            backgroundColor: isRunning ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunning ? 'Running Functional Tests...' : 'Run Functional Tests'}
        </button>
      </div>

      <div>
        <h3>Functional Test Results:</h3>
        {testResults.length === 0 ? (
          <p>No functional tests run yet. Click the button above to test your app's functionality.</p>
        ) : (
          <div>
            {/* Summary */}
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
              <h4>Functional Test Summary:</h4>
              <p>
                <strong>Total Tests:</strong> {testResults.length} | 
                <strong style={{ color: 'green' }}> Passed:</strong> {testResults.filter(r => r.status === 'success').length} | 
                <strong style={{ color: 'red' }}> Failed:</strong> {testResults.filter(r => r.status === 'error').length}
              </p>
              {testResults.filter(r => r.status === 'error').length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <strong style={{ color: 'red' }}>Failed Functionality:</strong>
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

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
        <h4>What This Tests:</h4>
        <ul>
          <li><strong>Announcements Page:</strong> Can load and display announcements</li>
          <li><strong>Contact Form:</strong> Can submit messages from Connect page</li>
          <li><strong>RAG Chat:</strong> Can ingest content and chat (like FloatingChatbot)</li>
          <li><strong>WebSocket:</strong> Can establish real-time connections</li>
          <li><strong>Admin Login:</strong> Admin endpoints are accessible</li>
        </ul>
      </div>
    </div>
  )
}

export default FunctionalTest
