import { useEffect, useRef, useState, useCallback } from 'react'
import './FloatingChatbot.css'

// Same base as other API consumers
const API_BASE = (typeof window !== 'undefined') ? (
  (import.meta?.env?.VITE_API_BASE) ||
  `${window.location.protocol}//${window.location.hostname}:${import.meta?.env?.VITE_API_PORT || '8000'}`
) : (import.meta?.env?.VITE_API_BASE || 'http://localhost:8000')

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const didIngestRef = useRef(false)
  const chatBodyRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [history, loading])

  // Focus input when chat opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [open])

  // One-time lightweight ingestion from current page content to prime RAG
  useEffect(() => {
    if (!open) return
    if (didIngestRef.current) return
    didIngestRef.current = true
    try {
      const stored = localStorage.getItem('intelinfo_rag_ingested_v1')
      if (stored === '1') return
    } catch (_) {}

    const collectText = () => {
      try {
        const nodes = Array.from(document.querySelectorAll('main, section, article, header, footer, h1, h2, h3, h4, p, li, a, span'))
        const pieces = []
        for (const n of nodes) {
          const t = (n.innerText || '').trim()
          if (t && t.length > 0) pieces.push(t)
          if (pieces.length > 800) break
        }
        const joined = pieces.join('\n')
        // Cap to ~50k chars to avoid oversized payloads
        return joined.length > 50000 ? joined.slice(0, 50000) : joined
      } catch (_) {
        return ''
      }
    }

    const bootstrap = async () => {
      const text = collectText()
      if (!text) return
      try {
        await fetch(`${API_BASE}/rag/ingest`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts: [text] })
        })
        try { localStorage.setItem('intelinfo_rag_ingested_v1', '1') } catch (_) {}
      } catch (_) {
        // ignore ingest errors; chat can still work without context
      }
    }

    bootstrap()
  }, [open])

  const send = useCallback(async () => {
    const q = input.trim()
    if (!q || loading) return
    
    setHistory(h => [...h, { role: 'user', text: q }])
    setInput('')
    setLoading(true)
    setIsTyping(true)
    
    try {
      const res = await fetch(`${API_BASE}/rag/chat`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      })
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        setHistory(h => [...h, { role: 'assistant', text: json.answer }])
        setIsTyping(false)
        setLoading(false)
      }, 500)
    } catch (e) {
      setTimeout(() => {
        setHistory(h => [...h, { role: 'assistant', text: 'Sorry, I hit a snag. Please try again.' }])
        setIsTyping(false)
        setLoading(false)
      }, 500)
    }
  }, [input, loading])

  const onKey = useCallback((e) => { 
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault()
      send()
    }
  }, [send])

  const handleToggle = useCallback(() => {
    setOpen(o => !o)
  }, [])

  return (
    <div className={`chatbot ${open ? 'open' : ''}`}>
      {/* SVG Filter for Liquid Glass Effect */}
      <svg style={{ display: 'none' }}>
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lighting-color="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="150"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {open && (
        <div className="liquidGlass-wrapper chat-window">
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>
          <div className="liquidGlass-content">
            <div className="chat-header">
              <span>AI Assistant</span>
              <button 
                className="close-btn" 
                onClick={handleToggle}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
              {history.length === 0 && (
                <div className="chat-hint">
                  👋 Welcome! Ask me anything about INTELINFO 2K25 symposium, events, or registration.
                </div>
              )}
              {history.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role}`}>
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="chat-msg assistant typing">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>
            <div className="chat-input-row">
              <textarea 
                ref={inputRef}
                value={input} 
                onChange={e => setInput(e.target.value)} 
                onKeyDown={onKey} 
                placeholder="Ask about INTELINFO events..." 
                rows={1}
                disabled={loading}
              />
              <button 
                className="send-btn" 
                onClick={send} 
                disabled={loading || !input.trim()}
              >
                {loading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="liquidGlass-wrapper chat-toggle" onClick={handleToggle}>
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>
        <div className="liquidGlass-content">
          {open ? '×' : '💬'}
        </div>
      </div>
    </div>
  )
}


