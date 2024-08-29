// frontend/src/components/Calendar/EventForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EventForm.css';

const EventForm = ({ setEvents,  eventToEdit, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(new Date(eventToEdit.date).toISOString().slice(0, 16)); // Convert date for input field
    } else {
      setTitle('');
      setDate('');
    }
  }, [eventToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (eventToEdit) {
        // Update existing event
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/events/${eventToEdit._id}`,
          { title, date },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === res.data._id ? res.data : event))
        );
        onSave(); // Call onSave after successful edit
      } else {
        // Create new event
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/events`,
          { title, date },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setEvents((prevEvents) => [...prevEvents, res.data]);
      }
      setTitle('');
      setDate('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
       <button type="submit">{eventToEdit ? 'Save Changes' : 'Add Event'}</button>
       {eventToEdit && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default EventForm;
