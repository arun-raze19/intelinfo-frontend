import { useState } from 'react'
import { messages, auth } from '../utils/api'

const UserMessagesTest = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [token, setToken] = useState('')
  const [testMessage, setTestMessage] = useState({
    contactName: 'Test User',
    contactEmail: 'test@intelinfo.me',
    subject: 'Test Message for Admin Inbox',
    message: 'This is a test message to verify that user messages appear in the admin inbox.'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('Attempting login for user messages test...')
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

  const createTestMessage = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('Creating test message:', testMessage)
      const response = await messages.create(testMessage)
      console.log('Message created successfully:', response)
      setResult({ success: true, message: 'Test message created successfully!', data: response })
    } catch (error) {
      console.error('Message creation failed:', error)
      setResult({ success: false, message: 'Failed to create message: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  const checkMessages = async () => {
    if (!token) {
      setResult({ success: false, message: 'Please login first to check messages.' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Checking messages with token:', token.substring(0, 10) + '...')
      const response = await messages.list(token)
      console.log('Messages retrieved:', response)
      setResult({ 
        success: true, 
        message: `Found ${response.length} messages in inbox.`, 
        data: response,
        messages: response
      })
    } catch (error) {
      console.error('Failed to retrieve messages:', error)
      setResult({ success: false, message: 'Failed to retrieve messages: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>User Messages Test</h2>
      <p>Test creating user messages and checking if they appear in the admin inbox.</p>

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

      {/* Message Creation Section */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
        <h3>Step 2: Create Test Message</h3>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contact Name:</label>
          <input
            type="text"
            value={testMessage.contactName}
            onChange={(e) => setTestMessage({ ...testMessage, contactName: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contact Email:</label>
          <input
            type="email"
            value={testMessage.contactEmail}
            onChange={(e) => setTestMessage({ ...testMessage, contactEmail: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Subject:</label>
          <input
            type="text"
            value={testMessage.subject}
            onChange={(e) => setTestMessage({ ...testMessage, subject: e.target.value })}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
          <textarea
            value={testMessage.message}
            onChange={(e) => setTestMessage({ ...testMessage, message: e.target.value })}
            rows="3"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          onClick={createTestMessage}
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
          {loading ? 'Creating...' : 'Create Test Message'}
        </button>
      </div>

      {/* Check Messages Section */}
      {token && (
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
          <h3>Step 3: Check Messages in Inbox</h3>
          <button
            onClick={checkMessages}
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
            {loading ? 'Checking...' : 'Check Messages in Inbox'}
          </button>
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
      {result?.messages && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Messages in Inbox ({result.messages.length} messages)</h3>
          {result.messages.length === 0 ? (
            <p>No messages found in inbox.</p>
          ) : (
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              {result.messages.map((msg, index) => (
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

      {/* Instructions */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '4px' }}>
        <h4>Instructions:</h4>
        <ol>
          <li>Login with admin credentials (ADMIN / Intelinfo@2025)</li>
          <li>Create a test message using the form above</li>
          <li>Check messages in inbox to see if it appears</li>
          <li>Go to the admin page (/admin) and click "Inbox" to verify</li>
        </ol>
      </div>
    </div>
  )
}

export default UserMessagesTest
