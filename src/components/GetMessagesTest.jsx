import { useState } from 'react'
import { messages, auth } from '../utils/api'

const GetMessagesTest = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [token, setToken] = useState('')
  const [messagesList, setMessagesList] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('Attempting login for GET messages test...')
      const response = await auth.login(credentials.username, credentials.password)
      console.log('Login successful:', response)
      setToken(response.token)
      setResult({ success: true, message: 'Login successful! Token received.', data: response })
    } catch (error) {
      console.error('Login failed:', error)
      setResult({ success: false, message: 'Login failed: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  const testGetMessages = async () => {
    if (!token) {
      setResult({ success: false, message: 'Please login first to get a token.' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Testing GET method for messages...')
      console.log('Token:', token.substring(0, 10) + '...')
      
      const response = await messages.list(token)
      console.log('GET messages response:', response)
      setMessagesList(response)
      setResult({ 
        success: true, 
        message: `GET request successful! Retrieved ${response.length} messages.`, 
        data: response 
      })
    } catch (error) {
      console.error('GET messages failed:', error)
      setResult({ success: false, message: 'GET request failed: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  const testDirectGet = async () => {
    if (!token) {
      setResult({ success: false, message: 'Please login first to get a token.' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Testing direct GET request...')
      const url = `https://api.intelinfo.me/messages?token=${encodeURIComponent(token)}`
      console.log('Direct GET URL:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      
      console.log('Direct GET response status:', response.status)
      console.log('Direct GET response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('Direct GET response data:', data)
      setMessagesList(data)
      setResult({ 
        success: true, 
        message: `Direct GET request successful! Retrieved ${data.length} messages.`, 
        data,
        method: 'direct'
      })
    } catch (error) {
      console.error('Direct GET request failed:', error)
      setResult({ success: false, message: 'Direct GET request failed: ' + error.message, method: 'direct' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>GET Messages Test</h2>
      <p>Test the GET method for fetching user messages from the API.</p>

      {/* Login Section */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Step 1: Admin Login</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Username (ADMIN)"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
          />
          <input
            type="password"
            placeholder="Password (Intelinfo@2025)"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        {token && (
          <div style={{ fontSize: '12px', color: '#666' }}>
            <strong>Token:</strong> {token.substring(0, 20)}...
          </div>
        )}
      </div>

      {/* GET Messages Testing Section */}
      {token && (
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
          <h3>Step 2: Test GET Method</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={testGetMessages}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: loading ? '#ccc' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Loading...' : 'Test GET Messages (API Service)'}
            </button>
            <button
              onClick={testDirectGet}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: loading ? '#ccc' : '#17a2b8',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Testing...' : 'Test Direct GET Request'}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div style={{
          padding: '15px',
          borderRadius: '4px',
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          marginBottom: '20px'
        }}>
          <h4>{result.success ? '✅ Success' : '❌ Error'}</h4>
          <p><strong>Message:</strong> {result.message}</p>
          {result.method && <p><strong>Method:</strong> {result.method}</p>}
          {result.data && (
            <details style={{ marginTop: '10px' }}>
              <summary>View Response Data</summary>
              <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '5px' }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </details>
          )}
        </div>
      )}

      {/* Messages List Display */}
      {messagesList && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Messages Retrieved via GET ({messagesList.length} messages)</h3>
          {messagesList.length === 0 ? (
            <p>No messages found in the database.</p>
          ) : (
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              {messagesList.map((msg, index) => (
                <div key={msg.id || index} style={{
                  padding: '10px',
                  margin: '5px 0',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}>
                  <div><strong>ID:</strong> {msg.id}</div>
                  <div><strong>From:</strong> {msg.contact_name} ({msg.contact_email})</div>
                  <div><strong>Subject:</strong> {msg.subject}</div>
                  <div><strong>Message:</strong> {msg.message}</div>
                  <div><strong>Date:</strong> {new Date(msg.created_at * 1000).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* API Information */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
        <h4>GET Method Details:</h4>
        <ul>
          <li><strong>Endpoint:</strong> <code>GET https://api.intelinfo.me/messages?token=TOKEN</code></li>
          <li><strong>Method:</strong> GET</li>
          <li><strong>Authentication:</strong> Required (admin token)</li>
          <li><strong>Response:</strong> JSON array of messages</li>
          <li><strong>Headers:</strong> Content-Type: application/json</li>
        </ul>
      </div>
    </div>
  )
}

export default GetMessagesTest
