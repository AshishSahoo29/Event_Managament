
import React, { useState } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [events, setEvents] = useState([]);


  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <EventForm setEvents={setEvents} />
      <EventList events={events} />
      
    </div>
  );
};

export default Dashboard;
