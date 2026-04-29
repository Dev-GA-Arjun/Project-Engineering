const express = require('express');
const bookingsRouter = require('./routes/bookings');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/bookings', bookingsRouter);

// Health check
app.get('/', (req, res) => {
  res.send('QuickSeat API is running');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});