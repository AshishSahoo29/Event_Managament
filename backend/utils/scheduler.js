
const cron = require('node-cron');
const Event = require('../models/Event');
const { sendReminder } = require('./email');


const scheduleReminders = () => {
  cron.schedule('10 09 * * *', async () => { //to run at 9.05 am daily
    const events = await Event.find({ date: { $gte: new Date() } }).populate('user');
    events.forEach(event => {
      console.log(event.user.email);
      sendReminder(event.user.email, event);
    });
  });
};



module.exports = scheduleReminders;
