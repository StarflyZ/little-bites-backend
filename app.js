require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./config/db'); // Pastikan impor sesuai

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stockRoutes = require('./routes/stockRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (gunakan async/await)
const startServer = async () => {
  try {
    console.log('Database connection established');
    
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try using port 3001 instead
        const newPort = port + 1;
        console.log(`Port ${port} is busy, trying port ${newPort}`);
        app.listen(newPort, () => {
          console.log(`Server running on port ${newPort}`);
        });
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Mulai server
startServer();

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/report', reportRoutes);
