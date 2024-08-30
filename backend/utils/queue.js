const Queue = require('bull');
const sendEventConfirmation = require('./email');

const eventQueue = new Queue('eventQueue', {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });
  
  eventQueue.process(async (job) => {
    const { email, event } = job.data;
    await sendEventConfirmation(email, event);
  });
  
  module.exports = eventQueue;