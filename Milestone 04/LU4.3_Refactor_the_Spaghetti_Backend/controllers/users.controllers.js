const {
  getAllUsers: getAllUsersService,
  getUserById,
  registerUser: registerUserService,
  deactivateUser,
  formatUser,
} = require('../services/users.services');

/**
 * GET all active users with formatted fullName
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    const formatted = users.map((u) => formatUser(u));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

/**
 * GET a single user by ID with formatted fullName
 */
const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(formatUser(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

/**
 * POST register a new user
 */
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const user = await registerUserService({ firstName, lastName, email });
    res.status(201).json(formatUser(user));
  } catch (err) {
    console.error(err);

    // Handle specific error cases
    if (err.message === 'firstName, lastName and email are required') {
      return res.status(400).json({ error: err.message });
    }

    if (err.message === 'Email already in use') {
      return res.status(409).json({ error: err.message });
    }

    res.status(500).json({ error: 'Failed to register user' });
  }
};

/**
 * DELETE deactivate a user
 */
const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await deactivateUser(id);
    res.json({ message: 'User deactivated', user: formatUser(user) });
  } catch (err) {
    console.error(err);

    // Handle specific error cases
    if (err.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(500).json({ error: 'Failed to deactivate user' });
  }
};

module.exports = {
  getAllUsers,
  getUserByIdHandler,
  createUser,
  deleteUserHandler,
};