import React, { useEffect, useState } from 'react';
import './Message.css';

function Message({ role, text }) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < viewportHeight - 100) {
        setIsKeyboardOpen(true);
      } else {
        setIsKeyboardOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewportHeight]);

  const timestamp = new Date(text.timestamp);

  // Handle invalid timestamp
  if (isNaN(timestamp)) {
    return (
      <div
        className={`d-flex mb-2 ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
        style={{ marginBottom: isKeyboardOpen ? '100px' : '10px' }}
      >
        <div className={`px-2 rounded-3 ${role === 'user' ? 'bg-success text-dark' : 'bg-orange text-white'}`}>
          {text.text && (
            <p className="mb-0" style={{ wordWrap: 'break-word' }}>
              {text.text}
            </p>
          )}
          <p style={{ fontSize: '9px' }} className="mb-0 opacity-60">Invalid date</p>
        </div>
      </div>
    );
  }

  // Custom formatted timestamp: 13/07/2025, 10:45 AM
  const day = timestamp.getDate().toString().padStart(2, '0');
  const month = (timestamp.getMonth() + 1).toString().padStart(2, '0');
  const year = timestamp.getFullYear();

  let hours = timestamp.getHours();
  const minutes = timestamp.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedTimestamp = `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;

  return (
    <div
      className={`d-flex mb-2 ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
      style={{ marginBottom: isKeyboardOpen ? '100px' : '10px' }}
    >
      <div className={`px-2 rounded-3 ${role === 'user' ? 'bg-success text-dark' : 'bg-orange text-white'}`}>
        {text.text && (
          <p className="mb-0" style={{ wordWrap: 'break-word' }}>
            {text.text}
          </p>
        )}
        <p style={{ fontSize: '9px' }} className="mb-0 opacity-60">{formattedTimestamp}</p>
      </div>
    </div>
  );
}

export default Message;
