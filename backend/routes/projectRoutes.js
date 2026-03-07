const express = require('express');
const router = express.Router();
const {
    getProjects,
    getFeaturedProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:slug', getProject);

// Admin routes
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
