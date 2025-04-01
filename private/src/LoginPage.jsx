import axios from 'axios';
import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  
const API_URL = import.meta.env.VITE_API_URL;
  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/auth/login`, { name })
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
    <div style={{ height: '100vh' }} className='  w-100 d-flex flex-column justify-content-center align-items-center bg-primary '>

      <form className='d-flex gap-1' onSubmit={handleSubmit}>
        <input className='rounded px-2' type="text" value={name} onChange={handleInputChange} placeholder="write..."/>
        <button className='btn btn-success' type="submit">Submit</button>
      </form>
     <div style={{color:'red'}}>{error && <p>{error}</p>}</div> 
    </div>
  );
}

export default LoginPage;
