import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import './Announcements.css'
import { announcements, messages, auth, createWebSocket } from '../utils/api'

const Announcements = () => {
  const [items, setItems] = useState([])
  const [messages, setMessages] = useState([])
  const [view, setView] = useState('ann') // 'ann' | 'inbox'
  const [wsConnected, setWsConnected] = useState(false)
  const wsRef = useRef(null)

  const [adminToken, setAdminToken] = useState('')
  const [loginState, setLoginState] = useState({ username: '', password: '' })

  const [form, setForm] = useState({ kind: 'text', title: '', content: '' })
  const [file, setFile] = useState(null)

  const load = useCallback(async () => {
    try {
      const data = await announcements.list()
      setItems(data)
    } catch (e) {
      console.error('Failed to load announcements:', e)
      // ignore for now
    }
  }, [])

  useEffect(() => { load() }, [load])

  const loadMessages = useCallback(async (token) => {
    if (!token) return
    try {
      const data = await messages.list(token)
      setMessages(data)
    } catch (e) {
      console.error('Failed to load messages:', e)
      alert('Failed to load inbox messages')
    }
  }, [])

  useEffect(() => {
    const ws = createWebSocket(
      (msg) => {
        if (msg?.type === 'new_announcement' && msg.payload) {
          setItems(prev => [msg.payload, ...prev])
        } else if (msg?.type === 'delete_announcement' && msg.payload?.id) {
          setItems(prev => prev.filter(a => a.id !== msg.payload.id))
        }
      },
      () => setWsConnected(true),
      () => setWsConnected(false),
      () => setWsConnected(false)
    )
    wsRef.current = ws
    
    return () => {
      ws.close()
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      console.log('Attempting admin login...')
      const json = await auth.login(loginState.username, loginState.password)
      console.log('Login successful, token received')
      setAdminToken(json.token)
      // Preload messages after login
      loadMessages(json.token)
      alert('Login successful! You can now manage announcements.')
    } catch (error) {
      console.error('Login failed:', error)
      if (error.message.includes('401')) {
        alert('Invalid credentials. Please check your username and password.')
      } else if (error.message.includes('Network error')) {
        alert('Network error. Please check your internet connection and try again.')
      } else {
        alert('Login failed: ' + error.message)
      }
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await announcements.create({
        kind: form.kind,
        title: form.title,
        content: form.content,
        file: file
      }, adminToken)
      
      setForm({ kind: 'text', title: '', content: '' })
      setFile(null)
    } catch (error) {
      console.error('Failed to create announcement:', error)
      alert('Failed to post: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!adminToken) return alert('Login required')
    try {
      await announcements.delete(id, adminToken)
    } catch (error) {
      console.error('Failed to delete announcement:', error)
      alert('Delete failed: ' + error.message)
    }
  }

  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin'

  return (
    <div className="announcements">
      <section className="section">
        <div className="container">
          <h1 className="page-title">Announcements</h1>
          <p className="page-subtitle">Latest updates from the Intelinfo team.</p>

          {isAdminRoute && (
            <div className="glass-card" style={{ marginBottom: '1rem', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <button className={`glass-btn${view==='ann' ? ' primary' : ''}`} onClick={() => setView('ann')}>Announcements</button>
                <button className={`glass-btn${view==='inbox' ? ' primary' : ''}`} onClick={() => { setView('inbox'); loadMessages(adminToken) }} style={{ marginLeft: 8 }}>Inbox</button>
              </div>
              {view === 'inbox' && adminToken && (
                <a className="glass-btn-primary" href={`https://api.intelinfo.me/messages.csv?token=${encodeURIComponent(adminToken)}`}>Download CSV</a>
              )}
            </div>
          )}

          <div className="ann-grid">
            {view === 'ann' && (
            <div className="ann-list glass-card">
              {items.length === 0 ? (
                <p className="empty">No announcements yet.</p>
              ) : (
                <ul className="ann-items">
                  {items.map(item => (
                    <li key={item.id} className="ann-item">
                      {item.title && <h3 className="ann-title">{item.title}</h3>}
                      {item.kind === 'text' && item.content && (
                        <p className="ann-text">{item.content}</p>
                      )}
                      {item.kind === 'link' && item.content && (
                        <a className="ann-link" href={item.content} target="_blank" rel="noopener noreferrer">{item.content}</a>
                      )}
                      {item.kind === 'image' && item.content && (
                        <img className="ann-media" src={item.content} alt={item.title || 'Announcement'} />
                      )}
                      {item.kind === 'video' && item.content && (
                        <video className="ann-media" src={item.content} controls />
                      )}
                      <div className="ann-meta">{new Date(item.created_at * 1000).toLocaleString()}</div>
                      {adminToken && (
                        <button className="glass-btn" onClick={() => handleDelete(item.id)} style={{ marginTop: '.5rem' }}>
                          Delete
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            )}

            {isAdminRoute && view === 'inbox' && (
              <div className="ann-list glass-card">
                {!adminToken ? (
                  <p className="empty">Login to view inbox.</p>
                ) : messages.length === 0 ? (
                  <p className="empty">No messages yet.</p>
                ) : (
                  <ul className="ann-items">
                    {Object.entries(messages.reduce((acc, m) => {
                        const key = m.contact_name || 'Unknown'
                        if (!acc[key]) acc[key] = []
                        acc[key].push(m)
                        return acc
                      }, {})).map(([name, list]) => (
                        <li key={name} className="ann-item">
                          <h3 className="ann-title">{name}</h3>
                          <ul>
                            {list.map(msg => (
                              <li key={msg.id} style={{ marginBottom: '.5rem' }}>
                                <div><strong>Subject:</strong> {msg.subject}</div>
                                <div><strong>Email:</strong> <a href={`mailto:${msg.contact_email}`}>{msg.contact_email}</a></div>
                                <div><strong>Message:</strong> {msg.message}</div>
                                <div className="ann-meta">{new Date(msg.created_at * 1000).toLocaleString()}</div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))
                    }
                  </ul>
                )}
              </div>
            )}

            {isAdminRoute && (
            <div className="ann-admin glass-card">
              <h3>Admin Panel</h3>
              {!adminToken ? (
                <form onSubmit={handleLogin} className="ann-form">
                  <input type="text" placeholder="Username" value={loginState.username} onChange={e => setLoginState({ ...loginState, username: e.target.value })} required />
                  <input type="password" placeholder="Password" value={loginState.password} onChange={e => setLoginState({ ...loginState, password: e.target.value })} required />
                  <button type="submit" className="glass-btn-primary">Login</button>
                </form>
              ) : (
                <form onSubmit={handleCreate} className="ann-form">
                  <select value={form.kind} onChange={e => setForm({ ...form, kind: e.target.value })}>
                    <option value="text">Text</option>
                    <option value="link">Link</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <input type="text" placeholder="Title (optional)" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  {form.kind === 'text' || form.kind === 'link' ? (
                    <input type="text" placeholder={form.kind === 'text' ? 'Text content' : 'https://link'} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
                  ) : (
                    <input type="file" accept={form.kind === 'image' ? 'image/*' : 'video/*'} onChange={e => setFile(e.target.files?.[0] || null)} />
                  )}
                  <button type="submit" className="glass-btn-primary">Post</button>
                </form>
              )}
              <div className={`ws-status ${wsConnected ? 'ok' : 'down'}`}>Live updates: {wsConnected ? 'Connected' : 'Disconnected'}</div>
            </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Announcements
