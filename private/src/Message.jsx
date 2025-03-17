import React from 'react';
import './Message.css';

function Message({ role, text }) {
  // Ensure text.timestamp is a valid date
  const timestamp = new Date(text.timestamp);

  // If the timestamp is invalid, return a fallback date or a message
  if (isNaN(timestamp)) {
    return (
      <div className={`d-flex mb-2 ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
        <div className={`px-2 rounded-3 ${role === 'user' ? 'bg-success text-dark' : 'bg-orange text-white'}`}>
          {/* Text message */}
          {text.text && (
            <p className="mb-0" style={{ wordWrap: 'break-word' }}>
              {text.text}
            </p>
          )}
          <p style={{ fontSize: '9px' }} className="mb-0 opacity-60">
            Invalid date
          </p>
        </div>
      </div>
    );
  }

  // Format the date to day/month time (e.g., "16/03 12:45 PM")
  const formattedTimestamp = timestamp.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    hour12: true, // Enable AM/PM format
  });

  return (
    <div className={`d-flex mb-2 ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`px-2 rounded-3 ${role === 'user' ? 'bg-success text-dark' : 'bg-orange text-white'}`}>
        {/* Text message */}
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
