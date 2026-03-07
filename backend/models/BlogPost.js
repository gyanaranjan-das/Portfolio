const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    content: {
        type: String,
        required: [true, 'Blog content is required'],
    },
    excerpt: {
        type: String,
        maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    },
    featuredImage: {
        type: String,
        default: '',
    },
    tags: [{
        type: String,
        trim: true,
    }],
    published: {
        type: Boolean,
        default: false,
    },
    author: {
        type: String,
        default: 'Gyanaranjan Das',
    },
}, {
    timestamps: true,
});

blogPostSchema.pre('validate', function () {
    if (this.title && (!this.slug || this.isModified('title'))) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    // Auto-generate excerpt from content if not provided
    if (this.content && !this.excerpt) {
        this.excerpt = this.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
    }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
