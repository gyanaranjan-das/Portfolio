const SiteConfig = require('../models/SiteConfig');

// @desc    Get site config (public)
// @route   GET /api/config
exports.getConfig = async (req, res, next) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            // Create default config if none exists
            config = await SiteConfig.create({});
        }
        res.json({ success: true, data: config });
    } catch (error) {
        next(error);
    }
};

// @desc    Update site config (admin)
// @route   PUT /api/config
exports.updateConfig = async (req, res, next) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            config = await SiteConfig.create(req.body);
        } else {
            Object.assign(config, req.body);
            await config.save();
        }
        res.json({ success: true, data: config });
    } catch (error) {
        next(error);
    }
};
