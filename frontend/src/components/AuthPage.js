// frontend/src/components/AuthPage.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="auth-page">
      {/* Toggle between Login and Register */}
      {isRegistering ? (
        <Register />
      ) : (
        <Login />
      )}
      <p onClick={() => setIsRegistering(!isRegistering)} className="toggle-auth">
        {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
      </p>
    </div>
  );
};

export default AuthPage;
