const {
  getAllPosts: getAllPostsService,
  getPost,
  createPost: createPostService,
  updatePost
} = require('../services/posts.services');

/**
 * GET all published posts
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

/**
 * GET a single post by ID
 */
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const post = await getPost(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

/**
 * POST create a new post
 */
const createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    // Validation
    if (!title || !authorId) {
      return res
        .status(400)
        .json({ error: 'title and authorId are required' });
    }

    const post = await createPostService({ title, content, authorId });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);

    // Handle specific error cases
    if (err.message === 'Author not found') {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.status(500).json({ error: 'Failed to create post' });
  }
};

/**
 * PUT publish a post
 */
const publishPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const post = await updatePost(id);
    res.json({ message: 'Post published', post });
  } catch (err) {
    console.error(err);

    // Handle specific error cases
    if (err.message === 'Post not found') {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(500).json({ error: 'Failed to publish post' });
  }
};



module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  publishPost
};