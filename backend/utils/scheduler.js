// backend/utils/scheduler.js
const cron = require('node-cron');
const Event = require('../models/Event');
const { sendReminder } = require('./email');

const scheduleReminders = () => {
  cron.schedule('55 19 * * *', async () => { // Run every day at 6.30pm
    const events = await Event.find({ date: { $gte: new Date() } }).populate('user');
    events.forEach(event => {
      console.log(event.user.email);
      sendReminder(event.user.email, event);
    });
  });
};

module.exports = scheduleReminders;
