// src/config.js

const CATEGORIES = ['bug', 'deadline', 'imposter', 'vibe-code'];

const DELETE_TOKEN = process.env.DELETE_TOKEN || 'supersecret123';

module.exports = {
  CATEGORIES,
  DELETE_TOKEN
};