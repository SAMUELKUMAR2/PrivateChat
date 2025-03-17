import React from 'react';
import { toast } from 'react-toastify'; // Import toastify for notifications

function ChatInput({ input, setInput, onSendMessage, onDeleteMessages }) {
  // Send message to parent when the send button is clicked
  const handleSendClick = () => {
    if (input.trim()) {
      onSendMessage({ text: input }); // Send text message
      setInput(''); // Clear input field after sending
    } else {
      toast.error('Please type a message before sending.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSendClick(); // Trigger send on Enter key
    }
  };

  const handleDeleteClick = () => {
    onDeleteMessages(); // Call parent function to delete messages
  };

  return (
    <div className="d-flex align-items-center gap-3">
      {/* Text input field for message */}
      <input
        type="text"
        className="form-control flex-grow-1"
        placeholder="Type a message"
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update input state
        onKeyDown={handleKeyPress} // Trigger send on Enter key
        aria-label="Type a message"
      />

      {/* Send button */}
      <button
        className="btn btn-primary"
        onClick={handleSendClick}
        disabled={!input.trim()} // Disable the send button when input is empty
        aria-label="Send message"
      >
        Send
      </button>

      {/* Delete button */}
      <button
        className="btn btn-danger"
        onClick={handleDeleteClick}
        aria-label="Delete all messages"
      >
        Delete
      </button>
    </div>
  );
}

export default ChatInput;
