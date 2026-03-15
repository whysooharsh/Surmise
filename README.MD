# Surmise Blog

A full-stack blog app built with React, Node.js, Express, and MongoDB.

## Features

- Authentication (register, login, logout)
- Create, edit, and delete posts
- Rich text editor support
- Image upload for posts
- Responsive frontend

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/harsSharma45/Surmise.git
   cd Surmise
   ```

2. Install backend dependencies
   ```bash
   cd api
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Create `api/.env`
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
   ```

5. Start the backend (from `api`)
   ```bash
   npm run dev
   ```

6. Start the frontend (from `frontend`)
   ```bash
   npm run dev
   ```

## Todo

- [ ] Add Redis for caching and sessions
- [ ] Add search functionality
- [ ] Add categories and tags




