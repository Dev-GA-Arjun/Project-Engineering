// src/app.js

const express = require('express');
const confessionRoutes = require('./routes');

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Route registration
app.use('/api/v1/confessions', confessionRoutes);

module.exports = app;