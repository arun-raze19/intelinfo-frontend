import { useState } from 'react'
import { auth } from '../utils/api'

const LoginTest = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      console.log('Attempting login with:', credentials.username)
      const response = await auth.login(credentials.username, credentials.password)
      console.log('Login successful:', response)
      setResult({ success: true, data: response })
    } catch (error) {
      console.error('Login failed:', error)
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testDirectApi = async () => {
    setLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('username', credentials.username)
      formData.append('password', credentials.password)

      console.log('Testing direct API call to /login')
      const response = await fetch('https://api.intelinfo.me/login', {
        method: 'POST',
        body: formData
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('Direct API response:', data)
      setResult({ success: true, data, method: 'direct' })
    } catch (error) {
      console.error('Direct API test failed:', error)
      setResult({ success: false, error: error.message, method: 'direct' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Admin Login Test</h2>
      <p>Test the admin login functionality with the backend API.</p>

      <form onSubmit={handleLogin} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="Enter admin username"
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Enter admin password"
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Test Login (API Service)'}
          </button>

          <button
            type="button"
            onClick={testDirectApi}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Testing...' : 'Test Direct API'}
          </button>
        </div>
      </form>

      {result && (
        <div style={{
          padding: '15px',
          borderRadius: '4px',
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          <h4>{result.success ? '✅ Login Successful' : '❌ Login Failed'}</h4>
          <p><strong>Method:</strong> {result.method || 'API Service'}</p>
          {result.success ? (
            <div>
              <p><strong>Token:</strong> {result.data.token}</p>
              <details style={{ marginTop: '10px' }}>
                <summary>Full Response</summary>
                <pre style={{ fontSize: '12px', overflow: 'auto', marginTop: '5px' }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <div>
              <p><strong>Error:</strong> {result.error}</p>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h4>Default Admin Credentials:</h4>
        <ul>
          <li><strong>Username:</strong> ADMIN</li>
          <li><strong>Password:</strong> Intelinfo@2025</li>
        </ul>
        <p><small>These are the default credentials from the backend configuration.</small></p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
        <h4>API Endpoint:</h4>
        <p><code>POST https://api.intelinfo.me/login</code></p>
        <p><strong>Content-Type:</strong> application/x-www-form-urlencoded</p>
        <p><strong>Body:</strong> username, password</p>
      </div>
    </div>
  )
}

export default LoginTest
