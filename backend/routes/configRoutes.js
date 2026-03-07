const express = require('express');
const router = express.Router();
const { getConfig, updateConfig } = require('../controllers/configController');
const { protect } = require('../middleware/auth');

router.get('/', getConfig);
router.put('/', protect, updateConfig);

module.exports = router;
