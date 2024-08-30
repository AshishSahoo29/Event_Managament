
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';
import EventForm from './EventForm';
import EventFilter from './EventFilter';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    // remove token 
    localStorage.removeItem('token');

    // redirect to the auth page (login and register page)
    navigate('/');
  };

    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/events`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // setEvents(res.data);
        const formattedEvents = res.data.map((event) => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (err) {
        console.error(err);
      }
    };

   // handle edit button click
   const handleEdit = (event) => {
    setEventToEdit(event);
    setShowModal(true);
  };

  // handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // refresh events list 
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };
  const handleEventClick = (event) => {
    setEventToEdit(event);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventToEdit(null);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFilter = (filterValue) => {
     if(filterValue === null) {
      setFilteredEvents(events);
     }else{
      const lowercasedFilter = filterValue.toLowerCase();
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(lowercasedFilter) ||
        new Date(event.date).toLocaleString().toLowerCase().includes(lowercasedFilter)
      );
      setFilteredEvents(filtered);
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
    if (!isFilterVisible) {
      // reset  to show all when filter is closed
      setFilteredEvents(events);
    }
  };


  return (
    <div className="calendar-container">
      <h2>Your Events</h2>
      <button className="sign" onClick={handleSignOut}>
        Sign Out
      </button>
      <button className="toggle-filter" onClick={toggleFilterVisibility}>
        {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
      </button>
      {isFilterVisible && <EventFilter onFilter={handleFilter} />}
      
      <EventForm
        setEvents={setEvents}
        
        onSave={() => {
          fetchEvents();
          
        }}
        
      />
      
      {/* <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
            <span>{event.title}</span>
            <span>{new Date(event.date).toLocaleString()}</span>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul> */}
       {/* <ul className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <li key={event._id} className="event-item">
              <span>{event.title}</span>
              <span>{new Date(event.date).toLocaleString()}</span>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No events found</li>
        )}
      </ul> */}
      <BigCalendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '20px 0' }}
        onSelectEvent={handleEventClick}        
      />  
      {showModal && (
        
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Event</h3>
            <EventForm
              setEvents={setEvents}
              eventToEdit={eventToEdit}
              onSave={() => {
                fetchEvents();
                handleModalClose();
              }}
              onCancel={handleModalClose}
            />
            <button className="delete-button" onClick={() => handleDelete(eventToEdit._id)}>
              Delete
            </button>
            <button className="cancel-button" onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </div>
        
      )}   
    </div>
  );
};

export default Calendar;
