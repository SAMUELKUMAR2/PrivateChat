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

  // Ensure text.timestamp is a valid date
  const timestamp = new Date(text.timestamp);

  // Handle invalid timestamp
  if (isNaN(timestamp)) {
    return (
      <div
        className={`d-flex mb-2 ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
        style={{ marginBottom: isKeyboardOpen ? '100px' : '10px' }} // Adjust margin when keyboard is open
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

  // Format timestamp
  const formattedTimestamp = timestamp.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    hour12: true,
  });

  return (
    <div
      className={`d-flex mb-2 ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
      style={{ marginBottom: isKeyboardOpen ? '100px' : '10px' }} // Adjust margin when keyboard is open
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
