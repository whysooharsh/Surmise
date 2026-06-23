require('dotenv').config();

// Validate required environment variables at startup
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('\n================================================================');
  console.error(`ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please configure these environment variables before starting the server.');
  console.error('================================================================\n');
  process.exit(1);
}

const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./Routes/authRoute');
const blogRoutes = require('./Routes/blogRoute');
const userRoutes = require('./Routes/userRoute');
const connectDB = require('./config/db');

const app = express();

// Secure headers (allows cross-origin image loading for uploads)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting (prevents API abuse/DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'https://surmise.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'            
    ];

app.use(cors({
  credentials: true, 
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin?.replace(/\/$/, '');
    const normalizedAllowedOrigins = allowedOrigins.map(o => o.replace(/\/$/, ''));

    if (normalizedAllowedOrigins.includes(normalizedOrigin) || 
        normalizedOrigin?.includes('vercel.app') || 
        normalizedOrigin?.includes('localhost')) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use('/uploads', (req, res, next) => {
  const origin = req.get('Origin');
  if (!origin) {
    res.header('Access-Control-Allow-Origin', '*'); 
  } else if (allowedOrigins.includes(origin) || origin.includes('vercel.app') || origin.includes('localhost')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/posts', blogRoutes);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    corsOrigins: allowedOrigins
  });
});



app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    if (err instanceof SyntaxError) {
        return res.status(400).json({
            error: "Invalid JSON format"
        });
    }
    
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            error: "CORS policy violation"
        });
    }
    
    res.status(500).json({
        error: process.env.NODE_ENV === 'production' 
            ? "Internal server error" 
            : err.message
    });
});

if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  const fs = require('fs');
  const distPath = path.join(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    app.get('/', (req, res) => {
      res.json({ message: "Surmise API is running." });
    });
  }
}

async function main() {
    try {
        await connectDB();
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

main();

module.exports = app;

if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
