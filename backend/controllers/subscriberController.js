const Subscriber = require('../models/Subscriber');

// @desc    Subscribe (public)
// @route   POST /api/subscribe
exports.subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // Check if already subscribed
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            return res.json({ success: true, message: 'Already subscribed!' });
        }

        await Subscriber.create({ email });
        res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all subscribers (admin)
// @route   GET /api/subscribers
exports.getSubscribers = async (req, res, next) => {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.json({ success: true, count: subscribers.length, data: subscribers });
    } catch (error) {
        next(error);
    }
};
