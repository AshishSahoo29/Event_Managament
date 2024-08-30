
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminder = (email, event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Event Reminder',
    text: `This is a reminder for your event: ${event.title} on ${event.date}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// const sendEventConfirmation = (email, event) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Event Confirmation',
//     text: `Your event "${event.title}" has been successfully registered. Event date: ${new Date(event.date).toLocaleString()}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Confirmation email sent: ' + info.response);
//     }
//   });
// };


module.exports = { sendReminder };
