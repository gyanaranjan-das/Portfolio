const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
exports.getFeaturedProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ featured: true }).sort({ order: 1 }).limit(6);
        res.json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single project by slug
// @route   GET /api/projects/:slug
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// @desc    Create project (admin)
// @route   POST /api/projects
exports.createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// @desc    Update project (admin)
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete project (admin)
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        next(error);
    }
};
