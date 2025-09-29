import { useState } from 'react'
import { rag } from '../utils/api'

const RagChatTest = () => {
  const [query, setQuery] = useState('')
  const [groqKey, setGroqKey] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])

  const testRagChat = async () => {
    if (!query.trim()) {
      setResult({ success: false, message: 'Please enter a query to test.' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Testing RAG chat with query:', query)
      console.log('GROQ Key provided:', groqKey ? 'Yes' : 'No')
      
      const response = await rag.chat(query, groqKey || null)
      console.log('RAG chat response:', response)
      
      setResult({ 
        success: true, 
        message: 'RAG chat successful!', 
        data: response 
      })
      
      // Add to chat history
      setChatHistory(prev => [
        ...prev,
        { 
          query: query, 
          response: response, 
          timestamp: new Date().toLocaleString(),
          groqKeyUsed: !!groqKey
        }
      ])
      
    } catch (error) {
      console.error('RAG chat failed:', error)
      setResult({ success: false, message: 'RAG chat failed: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  const testDirectRagChat = async () => {
    if (!query.trim()) {
      setResult({ success: false, message: 'Please enter a query to test.' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Testing direct RAG chat request...')
      const url = 'https://api.intelinfo.me/rag/chat'
      console.log('Direct RAG URL:', url)
      
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      
      if (groqKey) {
        headers['X-Groq-Key'] = groqKey
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query })
      })
      
      console.log('Direct RAG response status:', response.status)
      console.log('Direct RAG response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log('Direct RAG response data:', data)
      
      setResult({ 
        success: true, 
        message: 'Direct RAG chat successful!', 
        data,
        method: 'direct'
      })
      
    } catch (error) {
      console.error('Direct RAG chat failed:', error)
      setResult({ success: false, message: 'Direct RAG chat failed: ' + error.message, method: 'direct' })
    } finally {
      setLoading(false)
    }
  }

  const testRagIngest = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('Testing RAG ingest...')
      
      const testData = {
        texts: [
          'Intelinfo is a tech event management platform.',
          'The platform helps organize and manage technology events.',
          'Users can register for events and get updates through announcements.'
        ]
      }
      
      const response = await rag.ingest(testData)
      console.log('RAG ingest response:', response)
      
      setResult({ 
        success: true, 
        message: 'RAG ingest successful!', 
        data: response,
        method: 'ingest'
      })
      
    } catch (error) {
      console.error('RAG ingest failed:', error)
      setResult({ success: false, message: 'RAG ingest failed: ' + error.message, method: 'ingest' })
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = () => {
    setChatHistory([])
    setResult(null)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>RAG Chatbot Test</h2>
      <p>Test the RAG chatbot functionality with the API endpoint <code>https://api.intelinfo.me/rag/chat</code></p>

      {/* Query Input Section */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>RAG Chat Query</h3>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Query:</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your question about Intelinfo or any topic..."
            rows="3"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>GROQ API Key (Optional):</label>
          <input
            type="password"
            value={groqKey}
            onChange={(e) => setGroqKey(e.target.value)}
            placeholder="Enter GROQ API key for enhanced responses..."
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={testRagChat}
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
            {loading ? 'Testing...' : 'Test RAG Chat (API Service)'}
          </button>
          <button
            onClick={testDirectRagChat}
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
            {loading ? 'Testing...' : 'Test Direct RAG Request'}
          </button>
          <button
            onClick={testRagIngest}
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
            {loading ? 'Ingesting...' : 'Test RAG Ingest'}
          </button>
        </div>
      </div>

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

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>Chat History ({chatHistory.length} conversations)</h3>
            <button
              onClick={clearHistory}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear History
            </button>
          </div>
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            {chatHistory.map((chat, index) => (
              <div key={index} style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <div><strong>Query:</strong> {chat.query}</div>
                <div><strong>Response:</strong> {chat.response.answer || chat.response}</div>
                <div><strong>Timestamp:</strong> {chat.timestamp}</div>
                <div><strong>GROQ Key Used:</strong> {chat.groqKeyUsed ? 'Yes' : 'No'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Queries */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
        <h4>Sample Queries to Test:</h4>
        <ul>
          <li><strong>Intelinfo:</strong> "What is Intelinfo?"</li>
          <li><strong>Events:</strong> "Tell me about the events at Intelinfo"</li>
          <li><strong>Registration:</strong> "How do I register for events?"</li>
          <li><strong>General:</strong> "What is artificial intelligence?"</li>
          <li><strong>Tech:</strong> "Explain machine learning concepts"</li>
        </ul>
      </div>

      {/* API Information */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '4px' }}>
        <h4>RAG Chat API Details:</h4>
        <ul>
          <li><strong>Endpoint:</strong> <code>POST https://api.intelinfo.me/rag/chat</code></li>
          <li><strong>Method:</strong> POST</li>
            <li><strong>Body:</strong> <code>{"{\"query\": \"your question\"}"}</code></li>
          <li><strong>Headers:</strong> Content-Type: application/json</li>
          <li><strong>Optional:</strong> X-Groq-Key header for enhanced responses</li>
          <li><strong>Response:</strong> JSON with answer field</li>
        </ul>
      </div>
    </div>
  )
}

export default RagChatTest
