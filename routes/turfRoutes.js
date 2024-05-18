const express = require('express');
const router = express.Router();
const { getTurfs, checkAvailability } = require('../controllers/turfController');

router.get('/', getTurfs);
router.post('/availability', checkAvailability);

module.exports = router;
