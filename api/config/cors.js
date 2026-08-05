const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [
      'https://surmise.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'            
    ];

const corsOptions = {
  credentials: true, 
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedAllowedOrigins = allowedOrigins.map(o => o.replace(/\/$/, ''));

    if (normalizedAllowedOrigins.includes(normalizedOrigin) || 
        normalizedOrigin.includes('vercel.app') || 
        normalizedOrigin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
};

module.exports = {
  allowedOrigins,
  corsOptions
};
