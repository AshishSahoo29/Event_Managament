// frontend/src/components/Calendar/Calendar.js
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/Calendar.css';
import EventForm from './EventForm';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the auth page (login and register page)
    navigate('/');
  };

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

   // Handle edit button click
   const handleEdit = (event) => {
    setEventToEdit(event);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresh events list after deletion
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  return (
    <div className="calendar-container">
      <h2>Your Events</h2>
      <button className="sign" onClick={handleSignOut}>
        Sign Out
      </button>
      <EventForm
        setEvents={setEvents}
        eventToEdit={eventToEdit}
        onSave={() => {
          fetchEvents();
          setEventToEdit(null); // Clear the edit state after saving
        }}
        onCancel={() => setEventToEdit(null)}
      />
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <span>{event.title}</span>
            <span>{new Date(event.date).toLocaleString()}</span>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
