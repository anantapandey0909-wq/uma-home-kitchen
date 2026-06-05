const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS length =", process.env.EMAIL_PASS?.length);1

const { checkConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payment');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with support for frontend origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://uma-home-kitchen.vercel.app',
  'https://uma-home-kitchen-git-main-ananta-s-projects2.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    console.log('Request Origin:', origin);
console.log('Allowed Origins:', allowedOrigins);
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    return callback(new Error('CORS Policy Denied'), false);
  },
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes API mount
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Mount Global Error Handler (must be after all routes)
app.use(errorHandler);

// Validate database and start Express server
async function startServer() {
  // Test connection to postgres before listening
  await checkConnection();

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api`);
  });
}

startServer();
