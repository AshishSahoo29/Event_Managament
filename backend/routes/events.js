// backend/routes/events.js
const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/', auth, createEvent);
router.get('/', auth, getEvents);
router.put('/:id', auth, updateEvent);  
router.delete('/:id', auth, deleteEvent); 

module.exports = router;
