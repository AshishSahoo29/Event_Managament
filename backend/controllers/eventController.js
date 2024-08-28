// backend/controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newEvent = new Event({ title, description, date, user: req.user.userId });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: 'Error creating event.' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.userId }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};
