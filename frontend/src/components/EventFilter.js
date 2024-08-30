
import React, { useState } from 'react';
import '../styles/EventFilter.css';

const EventFilter = ({ onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="event-filter">
      <input
        type="text"
        placeholder="Filter by title or date"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default EventFilter;
