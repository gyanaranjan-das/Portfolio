const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPost);

// Admin routes
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
