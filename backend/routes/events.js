// backend/routes/events.js
const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, createEvent);
router.get('/', auth, getEvents);

module.exports = router;
