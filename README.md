# Fullstack Realtime Messaging App + AI Chat

A modern, full-stack messaging application built with **Express.js**, **React**, **TypeScript**, and **Socket.io**. This application enables real-time messaging between users with integrated AI chat capabilities powered by Whoop AI.

## 🎯 Features

- **Real-time Messaging**: Instant message delivery using Socket.io WebSocket connections
- **User Authentication**: Secure JWT-based authentication with Passport.js
- **Chat Management**: Create, update, and manage multiple chat conversations
- **AI Chat Integration**: Integrated AI chat capabilities for intelligent conversations
- **User Profiles**: User registration, login, and profile management
- **Image Uploads**: Cloud-based image storage using Cloudinary
- **Dark Mode Support**: Theme switching capability with Next Themes
- **Responsive Design**: Modern UI built with React, Tailwind CSS, and Radix UI components
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Online Status**: Track user online/offline status in real-time

## 🏗️ Project Structure

```
.
├── backend/                 # Express.js + TypeScript backend
│   ├── src/
│   │   ├── index.ts        # Application entry point
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic layer
│   │   ├── models/         # MongoDB schemas
│   │   ├── middlewares/    # Express middlewares
│   │   ├── validators/     # Input validation (Zod)
│   │   ├── config/         # Configuration files
│   │   ├── lib/            # Utilities (Socket.io setup)
│   │   └── utils/          # Helper functions
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── client/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── main.tsx        # Application entry point
│   │   ├── App.tsx         # Root component
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable UI components
│   │   ├── routes/         # Route configuration and guards
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── layouts/        # Layout components
│   ├── public/             # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── websocket-example/       # WebSocket implementation example
    └── server.js
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /auth/sign-up` - Register a new user
- `POST /auth/sign-in` - User login
- `POST /auth/logout` - User logout
- `GET /auth/status` - Check authentication status

### Chat Routes (`/api/chat`)

- `GET /chat` - Retrieve all chats for authenticated user
- `POST /chat` - Create a new chat
- `GET /chat/:id` - Get specific chat details
- `PUT /chat/:id` - Update chat
- `DELETE /chat/:id` - Delete chat
- `POST /chat/:id/messages` - Send message to chat

### User Routes (`/api/user`)

- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `GET /user/search` - Search for users

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (Atlas or local instance)
- **Cloudinary Account** (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd realtime-messaging-app
   ```

2. **Install dependencies**

   ```bash
   npm run install
   ```

   This command installs dependencies for both backend and client.

3. **Set up environment variables**

   Create a `.env` file in the `backend/` directory with the following variables:

   ```env
   NODE_ENV=development
   PORT=8000
   MONGO_URI=mongodb://your-mongodb-connection-string
   JWT_SECRET=your-secret-jwt-key
   JWT_EXPIRES_IN=15m
   FRONTEND_ORIGIN=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

### Development

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:8000`

#### Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Building

#### Build Backend

```bash
cd backend
npm run build
```

#### Build Frontend

```bash
cd client
npm run build
```

#### Build Everything

```bash
npm run build
```

### Production

#### Start Production Server

```bash
npm start
```

This starts the backend server which also serves the built frontend application.

## 📦 Tech Stack

### Backend

- **Express.js** (v5.1.0) - Web framework
- **TypeScript** (v5.9) - Type safety
- **MongoDB** & **Mongoose** - Database
- **Socket.io** (v4.8.1) - Real-time communication
- **Passport.js** - Authentication
- **JWT** - Token-based authentication
- **Bcryptjs** - Password hashing
- **Zod** - Schema validation
- **Cloudinary** - Image storage and management
- **Helmet** - HTTP security headers
- **Nodemon** - Development hot-reload

### Frontend

- **React** (v19.1) - UI library
- **TypeScript** (v5.9) - Type safety
- **Vite** (v7.1) - Build tool
- **React Router** (v7.9) - Client-side routing
- **Tailwind CSS** (v4.1) - Utility-first CSS
- **Radix UI** - Accessible component library
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Socket.io Client** - WebSocket client
- **Zustand** - State management
- **Zod** - Schema validation
- **Next Themes** - Theme provider

## 🔐 Authentication & Security

- **JWT-based Authentication**: Secure token-based user sessions
- **Passport.js**: Authentication middleware using JWT strategy
- **Password Hashing**: Bcryptjs for secure password storage
- **CORS Protection**: Configured CORS for cross-origin requests
- **HTTP Security Headers**: Helmet.js for enhanced security
- **Cookie-based Token Storage**: JWT tokens stored in HTTP-only cookies
- **Socket.io Authentication**: Real-time connection validation via JWT

## 🔌 Real-time Features

### Socket.io Events

- **User Connection**: Track user online/offline status
- **Message Broadcast**: Real-time message delivery to chat participants
- **Typing Indicator**: Show when users are typing
- **User Status Updates**: Live user availability updates

## 📝 Available Scripts

### Root Level

```bash
npm run install   # Install all dependencies
npm run build     # Build both frontend and backend
npm start         # Start production server
npm test          # Run tests
```

### Backend

```bash
npm run dev       # Start development server with hot-reload
npm run build     # Compile TypeScript and copy package.json
npm start         # Start compiled server
```

### Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🗄️ Database Schema

### User Model

- `_id` - MongoDB ObjectId
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `avatar` - User profile picture URL
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Chat Model

- `_id` - MongoDB ObjectId
- `name` - Chat name
- `participants` - Array of user IDs
- `messages` - Array of message IDs
- `isGroupChat` - Boolean flag for group chats
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Message Model

- `_id` - MongoDB ObjectId
- `sender` - User ID of message sender
- `chat` - Chat ID
- `content` - Message text content
- `image` - Optional image URL
- `createdAt` - Message timestamp
- `updatedAt` - Last update timestamp

## 🛠️ Configuration

### Backend Configuration

**Environment Variables** (`backend/src/config/env.config.ts`)

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 8000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - JWT expiration time (default: 15m)
- `FRONTEND_ORIGIN` - Frontend URL for CORS
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

**HTTP Configuration** (`backend/src/config/http.config.ts`)

- HTTP status codes and response formats

**Passport Configuration** (`backend/src/config/passport.config.ts`)

- JWT strategy setup and validation

**Database Configuration** (`backend/src/config/database.config.ts`)

- MongoDB connection and initialization

### Frontend Configuration

**Vite Configuration** (`client/vite.config.ts`)

- Build and development server settings

**Tailwind CSS** (`client/tailwind.config.js`)

- Utility CSS framework configuration

**TypeScript** (`client/tsconfig.json`)

- Compiler options and paths

## 🌐 CORS & Deployment

The application supports production deployment with:

- **Static File Serving**: Built frontend served by Express backend
- **CORS Configuration**: Restricted to configured frontend origin
- **Environment-based Setup**: Different behavior for development vs. production
- **Proxy Routing**: Frontend routes handled by backend in production

## 📚 Middleware

### Backend Middlewares

- **asyncHandler** - Async error handling wrapper
- **errorHandler** - Global error handling middleware
- **CORS** - Cross-origin request handling
- **Cookie Parser** - Cookie parsing and validation
- **Passport** - Authentication middleware
- **Helmet** - Security headers

## ✅ Code Quality

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Frontend code linting
- **Zod**: Runtime schema validation
- **Type Definitions**: Comprehensive type definitions across the stack

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

Charles Daniel

## 🤝 Support

For issues, questions, or contributions, please refer to the project repository.

---

**Last Updated**: May 19, 2026  
**Version**: 1.0.0
