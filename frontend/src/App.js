
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './components/Login';
//import Register from './components/Register';
import Calendar from './components/Calendar';
import AuthPage from  './components/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

const App = () => (
  <Router>
    <div className="app-container">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  </Router>
);

export default App;
