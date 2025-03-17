import axios from 'axios';
import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const admin = import.meta.env.VITE_API_ADMIN;
  const user = import.meta.env.VITE_API_USER;

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/login', { name })
      .then((response) => {
        if (response.data.role) {
          onLogin(response.data.role); // Pass role (admin or user) to the App component
        }
      })
      .catch((err) => {
        setError('Incorrect name. Please try again.');
      });
  };

  return (
    <div style={{ height: '100vh' }} className='  w-100 d-flex justify-content-center align-items-center bg-primary '>

      <form className='d-flex gap-1' onSubmit={handleSubmit}>
        <input className='rounded' type="text" value={name} onChange={handleInputChange} />
        <button className='btn btn-success' type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
