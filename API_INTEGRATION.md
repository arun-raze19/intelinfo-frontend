# Intelinfo Frontend - Backend Integration

## Overview
The frontend has been successfully integrated with the Intelinfo backend API running at `https://api.intelinfo.me`.

## API Integration Status ✅

### ✅ Completed Components

1. **API Service Module** (`src/utils/api.js`)
   - Centralized API communication
   - Error handling and response parsing
   - WebSocket support for real-time updates

2. **Announcements Component** (`src/pages/Announcements.jsx`)
   - ✅ List announcements from backend
   - ✅ Create new announcements (admin)
   - ✅ Delete announcements (admin)
   - ✅ Real-time updates via WebSocket
   - ✅ Admin login functionality
   - ✅ Message inbox (admin)
   - ✅ CSV export functionality

3. **Connect Component** (`src/pages/Connect.jsx`)
   - ✅ Send contact messages to backend
   - ✅ Form validation and error handling

4. **FloatingChatbot Component** (`src/components/FloatingChatbot.jsx`)
   - ✅ RAG chat integration
   - ✅ Content ingestion for context
   - ✅ Error handling and fallbacks

## Available API Endpoints

### Health & Status
- `GET /ping` - Ultra-fast ping endpoint
- `GET /health` - Health check endpoint  
- `GET /ready` - Readiness check
- `GET /startup` - Startup check for Coolify
- `GET /test` - Test endpoint
- `GET /debug` - Debug endpoint

### Authentication
- `POST /login` - Admin login (FormData: username, password)

### Announcements
- `GET /announcements` - List all announcements
- `POST /announcements` - Create announcement (FormData: kind, title, content, token, file)
- `DELETE /announcements/{id}` - Delete announcement (Query: token)

### Messages
- `POST /messages` - Send contact message (JSON: contact_name, contact_email, subject, message)
- `GET /messages` - List messages (Query: token) - Admin only
- `GET /messages.csv` - Export messages CSV (Query: token) - Admin only

### RAG (AI Chat)
- `POST /rag/ingest` - Ingest content (JSON: urls[], texts[])
- `POST /rag/chat` - Chat with AI (JSON: query, Header: X-Groq-Key)

### Real-time Updates
- `WebSocket /ws` - Real-time announcement updates

## Configuration

The frontend is configured to use the production backend at `https://api.intelinfo.me`. No environment variables are required.

## Testing

Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3001` and will connect to the production backend.

## Features Working

- ✅ Announcements display and management
- ✅ Contact form submission
- ✅ AI chatbot with RAG
- ✅ Real-time updates
- ✅ Admin panel functionality
- ✅ Error handling and user feedback

## Next Steps

The integration is complete and ready for production use. All components are properly connected to the backend API endpoints.
