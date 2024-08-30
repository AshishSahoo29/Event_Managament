
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

//MongoDB conn
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const scheduleReminders = require('./utils/scheduler');
scheduleReminders();