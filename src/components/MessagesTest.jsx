import { useState } from 'react'
import { messages, auth } from '../utils/api'

const MessagesTest = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [token, setToken] = useState('')
  const [messagesList, setMessagesList] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('Attempting login for messages test...')
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

  const testMessagesList = async () => {
    if (!token) {
      setResult({ success: false, message: 'Please login first to get a token.' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Testing messages list with token:', token.substring(0, 10) + '...')
      const response = await messages.list(token)
      console.log('Messages list successful:', response)
      setMessagesList(response)
      setResult({ success: true, message: `Successfully loaded ${response.length} messages.`, data: response })
    } catch (error) {
      console.error('Messages list failed:', error)
      setResult({ success: false, message: 'Failed to load messages: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  const testDirectMessagesApi = async () => {
    if (!token) {
      setResult({ success: false, message: 'Please login first to get a token.' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Testing direct messages API call...')
      const url = `https://api.intelinfo.me/messages?token=${encodeURIComponent(token)}`
      console.log('API URL:', url)
      
      const response = await fetch(url)
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('Direct API response:', data)
      setMessagesList(data)
      setResult({ success: true, message: `Direct API call successful! Loaded ${data.length} messages.`, data, method: 'direct' })
    } catch (error) {
      console.error('Direct messages API failed:', error)
      setResult({ success: false, message: 'Direct API call failed: ' + error.message, method: 'direct' })
    } finally {
      setLoading(false)
    }
  }

  const testCreateMessage = async () => {
    setLoading(true)
    setResult(null)

    try {
      const testMessage = {
        contactName: 'Messages Test User',
        contactEmail: 'test@intelinfo.me',
        subject: 'Test Message from Messages Test',
        message: 'This is a test message to verify the messages API is working correctly.'
      }

      console.log('Testing message creation...')
      const response = await messages.create(testMessage)
      console.log('Message creation successful:', response)
      setResult({ success: true, message: 'Message created successfully!', data: response })
    } catch (error) {
      console.error('Message creation failed:', error)
      setResult({ success: false, message: 'Failed to create message: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Messages API Test</h2>
      <p>Test the messages functionality including inbox loading and message creation.</p>

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

      {/* Messages Testing Section */}
      {token && (
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
          <h3>Step 2: Test Messages</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={testMessagesList}
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
              {loading ? 'Loading...' : 'Test Messages List (API Service)'}
            </button>
            <button
              onClick={testDirectMessagesApi}
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
              {loading ? 'Testing...' : 'Test Direct Messages API'}
            </button>
            <button
              onClick={testCreateMessage}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: loading ? '#ccc' : '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating...' : 'Test Create Message'}
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
          <h3>Messages List ({messagesList.length} messages)</h3>
          {messagesList.length === 0 ? (
            <p>No messages found.</p>
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
        <h4>API Endpoints:</h4>
        <ul>
          <li><code>POST https://api.intelinfo.me/login</code> - Admin login</li>
          <li><code>GET https://api.intelinfo.me/messages?token=TOKEN</code> - List messages (requires admin token)</li>
          <li><code>POST https://api.intelinfo.me/messages</code> - Create message (public)</li>
          <li><code>GET https://api.intelinfo.me/messages.csv?token=TOKEN</code> - Export CSV (requires admin token)</li>
        </ul>
      </div>
    </div>
  )
}

export default MessagesTest
