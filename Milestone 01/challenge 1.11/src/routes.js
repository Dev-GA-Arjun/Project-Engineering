// src/routes/confessionRoutes.js

const express = require('express');
const {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
} = require('./controllers');

const router = express.Router();

// Routes only delegate to controllers
router.post('/', createConfession);
router.get('/', getAllConfessions);
router.get('/category/:cat', getConfessionsByCategory);
router.get('/:id', getConfessionById);
router.delete('/:id', deleteConfession);

module.exports = router;