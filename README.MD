# Surmise Blog

A modern, minimalist blog platform built with React and Node.js. Share your thoughts and ideas with a clean, professional interface.

## ✨ Features

- **Modern UI**: Clean, minimalist design with responsive layout
- **Rich Text Editor**: Full-featured editor with formatting options
- **Image Support**: Upload and display images in posts
- **User Authentication**: Secure login and registration system
- **Post Management**: Create, edit, and delete blog posts
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harsSharma45/Surmise.git
   cd Surmise
   ```

2. **Install backend dependencies**
   ```bash
   cd api
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the `api` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
   ```

5. **Start the development servers**
   
   Backend (from `api` directory):
   ```bash
   npm run dev
   ```
   
   Frontend (from `frontend` directory):
   ```bash
   npm run dev
   ```





## 📝 TODO

- [ ] **Implement Redis** - Add Redis for caching and session management
- [ ] Add search functionality
- [ ] Implement categories/tags




