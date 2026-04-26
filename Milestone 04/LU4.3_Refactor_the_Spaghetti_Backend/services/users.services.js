const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all active users with their posts
 * @returns {Promise<Array>} Array of active users with posts
 */
async function getAllUsers() {
  const users = await prisma.user.findMany({
    where: { isActive: true },
    include: { posts: true },
  });
  return users;
}

/**
 * Get a single user by ID with their posts
 * @param {number} id - User ID
 * @returns {Promise<Object>} User object with posts or null
 */
async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { posts: true },
  });
  return user;
}

/**
 * Register a new user
 * @param {Object} data - User data {firstName, lastName, email}
 * @returns {Promise<Object>} Created user object
 * @throws {Error} If email already exists or validation fails
 */
async function registerUser(data) {
  const { firstName, lastName, email } = data;

  // Validation
  if (!firstName || !lastName || !email) {
    throw new Error('firstName, lastName and email are required');
  }

  // Check for existing email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      isActive: true,
    },
  });

  return user;
}

/**
 * Deactivate a user (soft delete)
 * @param {number} id - User ID
 * @returns {Promise<Object>} Updated user object
 * @throws {Error} If user doesn't exist
 */
async function deactivateUser(id) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const deactivatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isActive: false },
  });

  return deactivatedUser;
}

/**
 * Format user object with fullName
 * @param {Object} user - User object
 * @returns {Object} User object with fullName property
 */
function formatUser(user) {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
}

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  deactivateUser,
  formatUser,
};