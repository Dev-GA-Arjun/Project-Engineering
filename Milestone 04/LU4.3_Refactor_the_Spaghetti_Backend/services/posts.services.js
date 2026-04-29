const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get all published posts with author details
 * @returns {Promise<Array>} Array of published posts ordered by creation date
 */
async function getAllPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });
  return posts;
}

/**
 * Get a single post by ID
 * @param {number} id - Post ID
 * @returns {Promise<Object>} Post object with author details or null
 */
async function getPost(id) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });
  return post;
}

/**
 * Create a new post
 * @param {Object} data - Post data {title, content, authorId}
 * @returns {Promise<Object>} Created post object
 * @throws {Error} If author doesn't exist
 */
async function createPost(data) {
  const { title, content, authorId } = data;

  // Verify author exists
  const author = await prisma.user.findUnique({ where: { id: authorId } });
  if (!author) {
    throw new Error('Author not found');
  }

  const post = await prisma.post.create({
    data: {
      title,
      content: content || null,
      authorId,
      published: false,
    },
    include: { author: true },
  });

  return post;
}

/**
 * Update a post (publish it)
 * @param {number} id - Post ID
 * @returns {Promise<Object>} Updated post object
 * @throws {Error} If post doesn't exist
 */
async function updatePost(id) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    throw new Error('Post not found');
  }

  const updatedPost = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { published: true },
    include: { author: true },
  });

  return updatedPost;
}


module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
};