const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
    heroTitle: {
        type: String,
        default: 'GYANARANJAN DAS',
    },
    heroSubtitle: {
        type: String,
        default: 'Full-Stack MERN Developer',
    },
    aboutText: {
        type: String,
        default: 'Gyanaranjan Das, a full-stack developer based in India, crafts immersive digital experiences that blend clean architecture with striking design.',
    },
    bioText: {
        type: String,
        default: '',
    },
    socialLinks: {
        github: { type: String, default: 'https://github.com/gyanaranjan-das' },
        linkedin: { type: String, default: 'https://www.linkedin.com/in/gyanaranjan-das/' },
        instagram: { type: String, default: 'https://www.instagram.com/gyanaranjan.20/' },
        email: { type: String, default: 'dasgyanaranjan835@gmail.com' },
    },
    resumeUrl: {
        type: String,
        default: '',
    },
    heroImage: {
        type: String,
        default: '',
    },
    aboutImage: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
