
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  confirmationEmailSent: { type: Boolean, default: false },
});

module.exports = mongoose.model('Event', EventSchema);
