// frontend/src/components/Calendar/EventForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/EventForm.css';

const EventForm = ({ setEvents }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
