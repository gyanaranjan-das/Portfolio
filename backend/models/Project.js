const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
        type: String,
        maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    techStack: [{
        type: String,
        trim: true,
    }],
    featuredImage: {
        type: String, // Cloudinary URL
        default: '',
    },
    images: [{
        type: String, // Cloudinary URLs
    }],
    githubUrl: {
        type: String,
        default: '',
    },
    liveUrl: {
        type: String,
        default: '',
    },
    featured: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Auto-generate slug from title before saving
projectSchema.pre('validate', function () {
    if (this.title && (!this.slug || this.isModified('title'))) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
});

module.exports = mongoose.model('Project', projectSchema);
