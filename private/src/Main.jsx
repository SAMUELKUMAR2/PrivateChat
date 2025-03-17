import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginPage from './LoginPage'; // Import the LoginPage component

// Create the root of the app
const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleLogin = (role) => {
    // setIsLoggedIn(true);
    setRole(role);
  };

  return (
    <>
      {!role ? (
        <LoginPage onLogin={handleLogin} /> // Show the LoginPage if not logged in
      ) : (
        <App role={role} />  // Show the App page if logged in
      )}
    </>
  );
}

// Render the Root component inside the root element
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
