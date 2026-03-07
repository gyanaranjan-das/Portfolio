const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers } = require('../controllers/subscriberController');
const { protect } = require('../middleware/auth');

router.post('/', subscribe);
router.get('/', protect, getSubscribers);

module.exports = router;
