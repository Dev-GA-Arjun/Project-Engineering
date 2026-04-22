// src/controllers/confessionController.js

const {
  createConfessionService,
  getAllConfessionsService,
  getConfessionByIdService,
  getConfessionsByCategoryService,
  deleteConfessionService
} = require('./services');

const { CATEGORIES, DELETE_TOKEN } = require('./config');

// Controller handles request + response only

exports.createConfession = (req, res) => {
  const confessionData = req.body;

  const result = createConfessionService(confessionData, CATEGORIES);

  if (result.error) {
    return res.status(400).json({ msg: result.error });
  }

  res.status(201).json(result);
};

exports.getAllConfessions = (req, res) => {
  const data = getAllConfessionsService();
  res.json(data);
};

exports.getConfessionById = (req, res) => {
  const id = parseInt(req.params.id);

  const confession = getConfessionByIdService(id);

  if (!confession) {
    return res.status(404).json({ msg: 'not found' });
  }

  res.json(confession);
};

exports.getConfessionsByCategory = (req, res) => {
  const category = req.params.cat;

  if (!CATEGORIES.includes(category)) {
    return res.status(400).json({ msg: 'invalid category' });
  }

  const filteredConfessions = getConfessionsByCategoryService(category);

  res.json(filteredConfessions);
};

exports.deleteConfession = (req, res) => {
  const id = parseInt(req.params.id);
  const token = req.headers['x-delete-token'];

  if (token !== DELETE_TOKEN) {
    return res.status(403).json({ msg: 'no permission' });
  }

  const deletedItem = deleteConfessionService(id);

  if (!deletedItem) {
    return res.status(404).json({ msg: 'not found buddy' });
  }

  res.json({ msg: 'ok', item: deletedItem });
};