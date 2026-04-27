const express = require('express')
const router = express.Router()

const { getAllPosts, getPostById, createPost, publishPost } = require('../controllers/posts.controllers')

// GET /posts — Get all published posts with author
router.get('/posts', getAllPosts);

// GET /posts/:id — Get a single post
router.get('/posts/:id', getPostById);

// POST /posts — Create a new post
router.post('/posts', createPost);

// PATCH /posts/:id/publish — Publish a post
router.patch('/posts/:id/publish', publishPost);

module.exports = router;