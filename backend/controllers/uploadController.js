const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');

// Multer storage — temp local upload before Cloudinary
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, png, webp, gif) are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // If Cloudinary is configured, upload there
        if (process.env.CLOUDINARY_CLOUD_NAME) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'portfolio',
                transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
            });

            // Remove temp file
            fs.unlinkSync(req.file.path);

            return res.json({
                success: true,
                data: { url: result.secure_url, public_id: result.public_id },
            });
        }

        // Fallback: return local file path
        res.json({
            success: true,
            data: { url: `/uploads/${req.file.filename}`, public_id: null },
        });
    } catch (error) {
        // Clean up temp file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        next(error);
    }
};

module.exports = { upload, uploadImage };
