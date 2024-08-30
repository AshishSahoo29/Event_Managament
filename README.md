# Event Management System

## Project Description

The Event Management System is a web application designed to help users manage events effectively. The application allows users to create, edit, and delete events, as well as view events in a calendar format. Additionally, users receive email confirmations upon creating events and can set reminders for upcoming events. The system utilizes Node.js and Express for the backend, MongoDB as the database, and React for the frontend. Nodemailer is used to send emails, and Cron jobs are employed for scheduling tasks like sending reminder emails.

## Features

- User authentication and authorization using JWT.
- Create, update, and delete events.
- View events in a calendar format.
- Email confirmations sent upon event creation.
- Reminder emails sent prior to events.
- Responsive user interface built with React.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Task Scheduling**: Node-Cron
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- Node.js
- npm
- MongoDB
- Redis
- Git

## Setup Instructions

Follow these steps to set up and run the Event Management System on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine using Git.

```bash
git clone https://github.com/your-username/event-management-system.git
cd event-management-system

### 2. Install Dependencies
Install the required dependencies for both the backend and frontend.

### 3. Set Up MongoDB
Ensure MongoDB is running locally or use a hosted MongoDB service. Update the MongoDB URI in the .env file.

### 4. Set Up Redis
Ensure you have Redis installed and running on your system.
Start your Redis server:
```bash
redis-server

### 5. Configure environment variables
MONGO_URI: Your MongoDB connection string.
JWT_SECRET: A secret key for JWT authentication.
EMAIL_USER: The email address used for sending emails.
EMAIL_PASS: The password for the email address or an app-specific password.
REDIS_HOST: Host address for Redis.
REDIS_PORT: Port on which Redis is running.

In case you are using gmail with 2-step verification enabled, you need to generate App Password to by pass that security. You can use that in place of EMAIL_PASS.

### 6. Start the Application
Backend
Navigate to the backend directory and start the server:
```bash
cd backend
node index.js

Frontend
Navigate to frontend directory and start the development server
```bash
cd frontend
npm start
