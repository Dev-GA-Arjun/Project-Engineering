const express = require('express')
const router = express.Router()

const { getAllUsers, getUserByIdHandler, createUser, deleteUserHandler } = require('../controllers/users.controllers')

// GET /users — Get all active users with their posts
router.get('/users', getAllUsers);

// GET /users/:id — Get a single user by ID
router.get('/users/:id', getUserByIdHandler);

// POST /users — Create a new user
router.post('/users', createUser);

// DELETE /users/:id — Soft delete a user
router.delete('/users/:id', deleteUserHandler);

module.exports = router