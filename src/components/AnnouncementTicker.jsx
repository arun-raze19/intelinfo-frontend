import { useEffect, useMemo, useRef, useState } from 'react'
import './AnnouncementTicker.css'

// Reuse API base resolution like Announcements
const API_BASE = (typeof window !== 'undefined') ? (
  (import.meta?.env?.VITE_API_BASE) ||
  `${window.location.protocol}//${window.location.hostname}:${import.meta?.env?.VITE_API_PORT || '8000'}`
) : 'http://localhost:8000'

export default function AnnouncementTicker() {
  const [items, setItems] = useState([])
  const wsRef = useRef(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/announcements`)
        const data = await res.json()
        if (!mounted) return
        setItems(data.filter(a => a.kind === 'text'))
      } catch {}
    })()
    const wsScheme = API_BASE.startsWith('https') ? 'wss' : 'ws'
    const ws = new WebSocket(`${API_BASE.replace(/^https?/, wsScheme)}/ws`)
    wsRef.current = ws
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data)
        if (msg?.type === 'new_announcement' && msg.payload?.kind === 'text') {
          setItems(prev => [msg.payload, ...prev])
        } else if (msg?.type === 'delete_announcement' && msg.payload?.id) {
          setItems(prev => prev.filter(a => a.id !== msg.payload.id))
        }
      } catch {}
    }
    return () => { mounted = false; try { ws.close() } catch {} }
  }, [])

  const texts = useMemo(() => (items || []).map(a => (a.title ? `${a.title} — ${a.content || ''}` : (a.content || ''))).filter(Boolean), [items])

  if (!texts.length) return null

  return (
    <div className="ticker">
      <div className="ticker-inner" onClick={() => { window.location.href = '/announcements' }} role="button" tabIndex={0}>
        <div className="ticker-track">
          <div className="ticker-run" aria-label="Latest announcements">
            {texts.concat(texts).map((t, idx) => (
              <span key={idx} className="ticker-item">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


