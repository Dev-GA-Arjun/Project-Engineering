// src/services.js

let confessions = [];
let idCounter = 0;

// Handles validation + creation
function createConfessionService(confessionData, categories) {
  if (!confessionData || !confessionData.text) {
    return { error: 'need text' };
  }

  if (confessionData.text.length === 0) {
    return { error: 'too short' };
  }

  if (confessionData.text.length > 500) {
    return { error: 'text too big, must be less than 500 characters long buddy' };
  }

  if (!categories.includes(confessionData.category)) {
    return { error: 'category not in stuff' };
  }

  const newConfession = {
    id: ++idCounter,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  };

  confessions.push(newConfession);

  return newConfession;
}

// Returns sorted data
function getAllConfessionsService() {
  const sortedConfessions = [...confessions].sort(
    (a, b) => b.created_at - a.created_at
  );

  return {
    data: sortedConfessions,
    count: sortedConfessions.length
  };
}

// Find by ID
function getConfessionByIdService(id) {
  return confessions.find(c => c.id === id);
}

// Filter by category
function getConfessionsByCategoryService(category) {
  return confessions
    .filter(c => c.category === category)
    .reverse();
}

// Delete
function deleteConfessionService(id) {
  const index = confessions.findIndex(c => c.id === id);

  if (index === -1) return null;

  const deleted = confessions.splice(index, 1);

  return deleted[0];
}

module.exports = {
  createConfessionService,
  getAllConfessionsService,
  getConfessionByIdService,
  getConfessionsByCategoryService,
  deleteConfessionService
};