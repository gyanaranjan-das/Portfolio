/**
 * Seed script — creates initial admin user and sample data
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const BlogPost = require('./models/BlogPost');
const SiteConfig = require('./models/SiteConfig');

const seedData = async () => {
    await connectDB();

    console.log('Seeding database...');

    // --- Admin User ---
    const existingAdmin = await Admin.findOne({ email: 'admin@gyanlabs.io' });
    if (!existingAdmin) {
        await Admin.create({
            email: 'admin@gyanlabs.io',
            password: 'admin123', // Change this after first login!
            name: 'Gyanaranjan Das',
            role: 'superadmin',
        });
        console.log('✅ Admin user created (admin@gyanlabs.io / admin123)');
    } else {
        console.log('⏩ Admin user already exists');
    }

    // --- Site Config ---
    const existingConfig = await SiteConfig.findOne();
    if (!existingConfig) {
        await SiteConfig.create({
            heroTitle: 'GYANARANJAN DAS',
            heroSubtitle: 'Full-Stack MERN Developer',
            aboutText: 'Gyanaranjan Das, a full-stack developer based in India, crafts immersive digital experiences that blend clean architecture with striking design. His work transforms complex problems into seamless, high-performance web applications that connect users with technology.',
            socialLinks: {
                github: 'https://github.com/gyanaranjan-das',
                linkedin: 'https://www.linkedin.com/in/gyanaranjan-das/',
                instagram: 'https://www.instagram.com/gyanaranjan.20/',
                email: 'dasgyanaranjan835@gmail.com',
            },
        });
        console.log('✅ Site config created');
    } else {
        console.log('⏩ Site config already exists');
    }

    // --- Sample Projects ---
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
        await Project.insertMany([
            {
                title: 'E-Commerce App',
                description: 'A full-stack e-commerce application with product management, shopping cart, secure checkout, and user authentication. Built with React, Node.js, Express, and MongoDB.',
                shortDescription: 'Full-stack e-commerce with cart, checkout, and auth',
                techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
                featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
                githubUrl: 'https://github.com/gyanaranjan-das',
                featured: true,
                order: 1,
            },
            {
                title: 'SaaS Dashboard',
                description: 'A modern data analytics dashboard with real-time charts, user management, and responsive design. Features dark mode, interactive filters, and export capabilities.',
                shortDescription: 'Analytics dashboard with real-time charts and dark mode',
                techStack: ['React', 'Tailwind CSS', 'Chart.js', 'Node.js'],
                featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
                liveUrl: 'https://example.com',
                featured: true,
                order: 2,
            },
            {
                title: 'Portfolio V1',
                description: 'The first version of my personal portfolio website, featuring a dramatic dark theme with neon red accents, custom typography, and responsive design.',
                shortDescription: 'Personal portfolio with dark theme and custom typography',
                techStack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
                featuredImage: '',
                liveUrl: 'https://example.com',
                featured: true,
                order: 3,
            },
        ]);
        console.log('✅ Sample projects created');
    } else {
        console.log('⏩ Projects already exist');
    }

    // --- Sample Blog Posts ---
    const postCount = await BlogPost.countDocuments();
    if (postCount === 0) {
        await BlogPost.insertMany([
            {
                title: 'Getting Started with the MERN Stack',
                content: '<h2>Why MERN?</h2><p>The MERN stack (MongoDB, Express, React, Node.js) is one of the most popular full-stack JavaScript frameworks. It lets you build everything — from the database to the frontend — using a single language: JavaScript.</p><h2>Setting Up</h2><p>First, make sure you have Node.js installed. Then create your project structure with separate frontend and backend directories...</p>',
                excerpt: 'A beginner-friendly guide to building full-stack apps with MongoDB, Express, React, and Node.js.',
                tags: ['MERN', 'Tutorial', 'JavaScript'],
                published: true,
            },
            {
                title: 'Designing Dark-Themed UIs That Pop',
                content: '<h2>The Art of Dark Design</h2><p>Dark themes aren\'t just inverted colors. They require careful consideration of contrast ratios, accent colors, and layered surfaces to create depth and visual hierarchy...</p>',
                excerpt: 'Learn how to create stunning dark-themed interfaces with vibrant accent colors and proper contrast ratios.',
                tags: ['Design', 'UI/UX', 'CSS'],
                published: true,
            },
        ]);
        console.log('✅ Sample blog posts created');
    } else {
        console.log('⏩ Blog posts already exist');
    }

    console.log('\n🎉 Seed complete!');
    process.exit(0);
};

seedData().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});
