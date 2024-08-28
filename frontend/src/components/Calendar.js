// frontend/src/components/Calendar/Calendar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Calendar.css';
import EventForm from './EventForm';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="calendar-container">
      <h2>Your Events</h2>
      <EventForm setEvents={setEvents} />
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <span>{event.title}</span>
            <span>{new Date(event.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
