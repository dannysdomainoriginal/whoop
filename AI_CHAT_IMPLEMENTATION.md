# AI Chat Feature - Implementation Guide

## Overview

A dedicated AI chatbot feature has been added to your MERN stack app using Google Gemini API. Users can create separate AI conversations that are stored independently from user-to-user messaging.

## What's Implemented

### Backend

- ✅ **MongoDB Models**
  - `AIChatModel` - Stores AI chat sessions (userId, title, timestamps)
  - `AIChatMessageModel` - Stores individual messages with role (user/ai)

- ✅ **API Endpoints** (`/api/ai-chat`)
  - `POST /ai-chat` - Create new AI chat
  - `GET /ai-chat` - Get all chats for user
  - `GET /ai-chat/:id` - Get specific chat with messages
  - `POST /ai-chat/:id/message` - Send message and get AI response
  - `DELETE /ai-chat/:id` - Delete a chat

- ✅ **Gemini AI Integration**
  - Integrated Google Generative AI SDK
  - Maintains conversation history for context-aware responses
  - Error handling with fallback messages
  - Auto-titles chats from first user message

- ✅ **Security**
  - Authentication required on all endpoints
  - User-scoped data (can't access other users' chats)
  - Environment-based API key management

### Frontend

- ✅ **Type Definitions** - TypeScript types for AI chats/messages
- ✅ **API Service** - `aiChatAPI` wrapper for all backend calls
- ✅ **State Management** - Zustand store (`useAIChat`) for state
- ✅ **Components**
  - `AIChatMessage` - Message display with role styling
  - `AIChatBody` - Main conversation area with auto-scroll
  - `AIChatFooter` - Input area with send button
  - `AIChatHeader` - Chat title and delete button
  - `AIChatListItem` - Chat list item with delete action
  - `AIChatList` - Sidebar list with "New Chat" button

- ✅ **Pages**
  - `AIChatPage` - Full AI chat interface

- ✅ **Routing** - Integrated `/ai-chat/:id` route

- ✅ **UI Integration**
  - Sparkles icon button in navbar to access AI chats
  - AI chat sidebar appears when on AI chat routes
  - Dark mode support throughout

## Setup Instructions

### 1. Backend Setup

#### Install Gemini Package

```bash
cd backend
npm install @google/generative-ai
```

#### Configure Environment

Add to your `.env` file in the backend:

```
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

To get your API key:

1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create a new API key
4. Copy and paste into `.env`

#### Start Backend

```bash
npm run dev
```

### 2. Frontend Setup

No additional setup needed - all dependencies already installed!

```bash
cd client
npm run dev
```

## Usage Flow

### For Users

1. Click the sparkles icon (✨) in the left sidebar
2. Click "New Chat" to start a conversation
3. Type your message and press Enter or click Send
4. AI responds with context-aware answers
5. Continue conversation - history is maintained
6. Click Delete button in header to remove chat

### Features

- **Conversation History** - All messages stored persistently
- **Auto-Titling** - First message becomes chat title
- **Context Awareness** - AI remembers full conversation
- **Real-time Feedback** - Loading states while AI responds
- **Dark Mode** - Full dark mode support
- **Mobile Responsive** - Works on mobile and desktop

## API Response Examples

### Create Chat

```json
{
  "message": "AI chat created successfully",
  "chat": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "title": "New Chat",
    "createdAt": "2026-05-23T02:13:22.129Z",
    "updatedAt": "2026-05-23T02:13:22.129Z"
  }
}
```

### Send Message

```json
{
  "message": "Message sent successfully",
  "userMessage": {
    "_id": "507f1f77bcf86cd799439013",
    "aiChatId": "507f1f77bcf86cd799439011",
    "role": "user",
    "content": "What is React?",
    "createdAt": "2026-05-23T02:14:00.000Z"
  },
  "aiMessage": {
    "_id": "507f1f77bcf86cd799439014",
    "aiChatId": "507f1f77bcf86cd799439011",
    "role": "ai",
    "content": "React is a JavaScript library...",
    "createdAt": "2026-05-23T02:14:05.000Z"
  }
}
```

## File Structure

### Backend

```
backend/src/
├── models/
│   ├── aiChat.model.ts           # AI Chat schema
│   └── aiChatMessage.model.ts    # AI Message schema
├── controllers/
│   └── aiChat.controller.ts      # Request handlers
├── services/
│   └── aiChat.service.ts         # Business logic & Gemini API
├── routes/
│   └── aiChat.route.ts           # API routes
├── validators/
│   └── aiChat.validator.ts       # Zod schemas
└── config/
    └── env.config.ts            # Environment variables
```

### Frontend

```
client/src/
├── types/
│   └── aiChat.type.ts            # TypeScript types
├── lib/
│   └── aiChat.api.ts             # API wrapper
├── hooks/
│   └── use-ai-chat.ts            # Zustand store
├── components/
│   ├── ai-chat-message.tsx       # Message display
│   ├── ai-chat-body.tsx          # Conversation area
│   ├── ai-chat-footer.tsx        # Input area
│   ├── ai-chat-header.tsx        # Header with title
│   ├── ai-chat-list-item.tsx     # Sidebar item
│   └── ai-chat-list.tsx          # Sidebar
├── pages/
│   └── AIChatPage.tsx            # Full page
└── routes/
    └── routes.tsx               # Route config
```

## Troubleshooting

### Issue: "Google Generative AI not initialized"

- **Solution**: Install the package: `npm install @google/generative-ai`

### Issue: API returns 401 Unauthorized

- **Solution**: Check your JWT token and ensure you're authenticated

### Issue: Empty responses from AI

- **Solution**: Verify `GOOGLE_GEMINI_API_KEY` is set in `.env`

### Issue: Conversation context is lost

- **Solution**: Backend maintains full history - clear browser cache and try again

## Future Enhancements

- Stream AI responses for real-time display
- Add system prompts/personalities
- Export conversation history
- Rate limiting per user
- Chat search functionality
- Conversation sharing (read-only)
- Voice input/output
- Image support in messages

## Notes

- All code stays on **main branch** (no branching)
- Keep `.env` file in `.gitignore` (never commit API keys)
- Messages are separated from user-to-user chats
- AI responses are cached locally in state
- No real-time WebSocket yet (HTTP-based for now)
