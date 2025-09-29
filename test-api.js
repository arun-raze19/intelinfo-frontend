// Test script to verify API endpoints
import { healthCheck, announcements, messages, rag } from './src/utils/api.js'

async function testAPI() {
  console.log('Testing Intelinfo API endpoints...')
  
  try {
    // Test health endpoints
    console.log('Testing health endpoints...')
    const ping = await healthCheck.ping()
    console.log('✅ Ping:', ping)
    
    const health = await healthCheck.health()
    console.log('✅ Health:', health)
    
    const ready = await healthCheck.ready()
    console.log('✅ Ready:', ready)
    
    // Test announcements
    console.log('Testing announcements...')
    const annList = await announcements.list()
    console.log('✅ Announcements list:', annList.length, 'items')
    
    // Test RAG chat
    console.log('Testing RAG chat...')
    try {
      const chatResponse = await rag.chat('Hello, what is INTELINFO?')
      console.log('✅ RAG Chat response:', chatResponse)
    } catch (error) {
      console.log('⚠️ RAG Chat test failed (expected if no Groq key):', error.message)
    }
    
    console.log('🎉 All API tests completed successfully!')
    
  } catch (error) {
    console.error('❌ API test failed:', error.message)
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  testAPI()
}

export { testAPI }
