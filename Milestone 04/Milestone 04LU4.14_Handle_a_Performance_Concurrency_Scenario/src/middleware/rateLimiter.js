const rateLimit = require('express-rate-limit');

const bookingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    message: "Too many booking attempts. Try again after a minute."
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = bookingLimiter;