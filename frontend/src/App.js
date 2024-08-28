// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './components/Login';
//import Register from './components/Register';
import Calendar from './components/Calendar';
import AuthPage from  './components/AuthPage';
import './styles/App.css';

const App = () => (
  <Router>
    <div className="app-container">
      <Routes>
         <Route path="/" element={<AuthPage />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  </Router>
);

export default App;
