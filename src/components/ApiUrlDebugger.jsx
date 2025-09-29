import { useState, useEffect } from 'react'

const ApiUrlDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({})

  useEffect(() => {
    const info = {
      currentUrl: window.location.href,
      hostname: window.location.hostname,
      origin: window.location.origin,
      protocol: window.location.protocol,
      port: window.location.port,
      viteApiBase: import.meta?.env?.VITE_API_BASE,
      viteApiPort: import.meta?.env?.VITE_API_PORT,
      nodeEnv: import.meta?.env?.NODE_ENV,
      mode: import.meta?.env?.MODE,
      allEnvVars: import.meta?.env
    }
    setDebugInfo(info)
  }, [])

  const testApiCall = async () => {
    try {
      const response = await fetch('https://api.intelinfo.me/ping')
      const data = await response.text()
      alert(`API Test Successful!\nResponse: ${data}`)
    } catch (error) {
      alert(`API Test Failed!\nError: ${error.message}`)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>API URL Debugger</h2>
      <p>This tool helps debug why the frontend might be using the wrong API URL.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testApiCall}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test API Connection
        </button>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h4>Environment Information:</h4>
        <pre style={{ fontSize: '12px', overflow: 'auto', backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '4px' }}>
        <h4>Expected vs Actual:</h4>
        <ul>
          <li><strong>Expected API URL:</strong> https://api.intelinfo.me</li>
          <li><strong>Current hostname:</strong> {debugInfo.hostname}</li>
          <li><strong>Current origin:</strong> {debugInfo.origin}</li>
          <li><strong>VITE_API_BASE:</strong> {debugInfo.viteApiBase || 'Not set'}</li>
          <li><strong>VITE_API_PORT:</strong> {debugInfo.viteApiPort || 'Not set'}</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
        <h4>Common Issues:</h4>
        <ul>
          <li>If VITE_API_PORT is set to 8006, it might be interfering with API URL construction</li>
          <li>If hostname is 'intelinfo.me', the old logic might be adding :8000</li>
          <li>Check browser console for "FINAL API_BASE resolved to:" message</li>
          <li>Make sure to rebuild and redeploy after configuration changes</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '4px' }}>
        <h4>Solution Steps:</h4>
        <ol>
          <li>Check browser console for API_BASE resolution logs</li>
          <li>Verify VITE_API_BASE is set to https://api.intelinfo.me</li>
          <li>Remove any VITE_API_PORT environment variables</li>
          <li>Rebuild and redeploy the application</li>
          <li>Clear browser cache and test again</li>
        </ol>
      </div>
    </div>
  )
}

export default ApiUrlDebugger
