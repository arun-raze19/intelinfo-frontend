import { useEffect, useMemo, useRef, useState } from 'react'
import './AnnouncementTicker.css'
import { announcements, createWebSocket } from '../utils/api'

export default function AnnouncementTicker() {
  const [items, setItems] = useState([])
  const wsRef = useRef(null)

  useEffect(() => {
    let mounted = true
    
    // Load announcements using the centralized API service
    ;(async () => {
      try {
        const data = await announcements.list()
        if (!mounted) return
        setItems(data.filter(a => a.kind === 'text'))
      } catch (error) {
        console.error('Failed to load announcements for ticker:', error)
      }
    })()

    // Use centralized WebSocket service
    const ws = createWebSocket(
      (msg) => {
        if (msg?.type === 'new_announcement' && msg.payload?.kind === 'text') {
          setItems(prev => [msg.payload, ...prev])
        } else if (msg?.type === 'delete_announcement' && msg.payload?.id) {
          setItems(prev => prev.filter(a => a.id !== msg.payload.id))
        }
      },
      () => console.log('Ticker WebSocket connected'),
      () => console.log('Ticker WebSocket disconnected'),
      () => console.log('Ticker WebSocket error')
    )
    wsRef.current = ws

    return () => { 
      mounted = false
      try { 
        ws.close() 
      } catch {} 
    }
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


