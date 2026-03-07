const BlogPost = require('../models/BlogPost');

// @desc    Get all published blog posts
// @route   GET /api/blog
exports.getPosts = async (req, res, next) => {
    try {
        const filter = req.query.all === 'true' ? {} : { published: true };
        const posts = await BlogPost.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
exports.getPost = async (req, res, next) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

// @desc    Create blog post (admin)
// @route   POST /api/blog
exports.createPost = async (req, res, next) => {
    try {
        const post = await BlogPost.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

// @desc    Update blog post (admin)
// @route   PUT /api/blog/:id
exports.updatePost = async (req, res, next) => {
    try {
        const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete blog post (admin)
// @route   DELETE /api/blog/:id
exports.deletePost = async (req, res, next) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
        next(error);
    }
};
