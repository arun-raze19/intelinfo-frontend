// API service module for Intelinfo Backend
// Dynamic API base URL resolution for different environments
const getApiBase = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'https://api.intelinfo.me'
  }
  
  // Check for environment variable first (for build-time configuration)
  if (import.meta?.env?.VITE_API_BASE) {
    console.log('Using VITE_API_BASE:', import.meta.env.VITE_API_BASE)
    return import.meta.env.VITE_API_BASE
  }
  
  // Check if we're running locally (development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Development mode detected, using production API')
    return 'https://api.intelinfo.me'
  }
  
  // For production deployment, use the production API
  console.log('Production mode detected, using production API')
  return 'https://api.intelinfo.me'
}

const API_BASE = getApiBase()
console.log('API_BASE resolved to:', API_BASE)

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  }
  
  const config = { ...defaultOptions, ...options }
  
  // Add debugging information
  console.log(`API Request: ${config.method || 'GET'} ${url}`)
  
  try {
    const response = await fetch(url, config)
    
    console.log(`API Response: ${response.status} ${response.statusText}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error ${response.status}:`, errorText)
      throw new Error(`API Error ${response.status}: ${errorText}`)
    }
    
    // Handle different response types
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      console.log('API Success:', data)
      return data
    }
    
    const textData = await response.text()
    console.log('API Success (text):', textData)
    return textData
  } catch (error) {
    console.error('API Request failed:', error)
    // Add more specific error information
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Network error: Unable to connect to ${API_BASE}. Please check your internet connection and try again.`)
    }
    throw error
  }
}

// Health check endpoints
export const healthCheck = {
  ping: () => apiRequest('/ping'),
  health: () => apiRequest('/health'),
  ready: () => apiRequest('/ready'),
  startup: () => apiRequest('/startup'),
  test: () => apiRequest('/test'),
  debug: () => apiRequest('/debug')
}

// Authentication
export const auth = {
  login: async (username, password) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    
    return apiRequest('/login', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData
    })
  }
}

// Announcements
export const announcements = {
  list: () => apiRequest('/announcements'),
  
  create: async (announcementData, token) => {
    const formData = new FormData()
    formData.append('kind', announcementData.kind)
    if (announcementData.title) formData.append('title', announcementData.title)
    if (announcementData.content) formData.append('content', announcementData.content)
    if (token) formData.append('token', token)
    if (announcementData.file) formData.append('file', announcementData.file)
    
    return apiRequest('/announcements', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData
    })
  },
  
  delete: async (announcementId, token) => {
    return apiRequest(`/announcements/${announcementId}?token=${encodeURIComponent(token)}`, {
      method: 'DELETE'
    })
  }
}

// Messages
export const messages = {
  create: async (messageData) => {
    return apiRequest('/messages', {
      method: 'POST',
      body: JSON.stringify({
        contact_name: messageData.contactName,
        contact_email: messageData.contactEmail,
        subject: messageData.subject,
        message: messageData.message
      })
    })
  },
  
  list: async (token) => {
    const endpoint = token ? `/messages?token=${encodeURIComponent(token)}` : '/messages'
    return apiRequest(endpoint)
  },
  
  exportCsv: async (token) => {
    return apiRequest(`/messages.csv?token=${encodeURIComponent(token)}`)
  }
}

// RAG (Retrieval Augmented Generation)
export const rag = {
  ingest: async (data) => {
    return apiRequest('/rag/ingest', {
      method: 'POST',
      body: JSON.stringify({
        urls: data.urls || null,
        texts: data.texts || null
      })
    })
  },
  
  chat: async (query, groqKey = null) => {
    const headers = {}
    if (groqKey) {
      headers['X-Groq-Key'] = groqKey
    }
    
    return apiRequest('/rag/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query })
    })
  }
}

// WebSocket connection for real-time updates
export const createWebSocket = (onMessage, onOpen, onClose, onError) => {
  const wsUrl = API_BASE.replace(/^https?/, API_BASE.startsWith('https') ? 'wss' : 'ws') + '/ws'
  console.log('Creating WebSocket connection to:', wsUrl)
  const ws = new WebSocket(wsUrl)
  
  ws.onopen = onOpen
  ws.onclose = onClose
  ws.onerror = onError
  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)
      onMessage(message)
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
    }
  }
  
  return ws
}

export default {
  API_BASE,
  healthCheck,
  auth,
  announcements,
  messages,
  rag,
  createWebSocket
}
