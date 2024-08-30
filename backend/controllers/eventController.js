
const Event = require('../models/Event');
// const sendConfirmationEmail = require('../utils/email').sendConfirmationEmail;
// const scheduleConfirmationEmail = require('../utils/scheduler'); 

//const sendEventConfirmation = require('../utils/email');

exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newEvent = new Event({ title, description, date, user: req.user.userId });
    await newEvent.save();
    //await sendEventConfirmation(req.user.email, newEvent);

    // Add a job to the queue to send the email after 5 minutes
    // eventQueue.add({
    //   email: req.user.email,
    //   event: newEvent
    // }, {
    //   delay: 5 * 60 * 1000 // 5 minutes in milliseconds
    // });

    //scheduleConfirmationEmail(newEvent._id, 5 * 60 * 1000);

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: 'Error while creating event.' });
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

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, date, description },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    //await sendEventConfirmation(req.user.email, updatedEvent);
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete event
 exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
