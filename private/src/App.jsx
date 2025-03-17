import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify'; // To show notifications
import ChatInput from './ChatInput';
import Message from './Message';

function App({ role }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch messages from backend when the component mounts
  useEffect(() => {
    axios.get(`${API_URL}/messages`)
      .then((response) => {
        setMessages(response.data); // Fetch messages from the backend
      })
      .catch((err) => {
        console.error('Error fetching messages:', err);
        toast.error('Error fetching messages.');
      });
  }, [input]); // Only fetch once when the component mounts

  // Function to send a message to the backend
  const sendMessage = (message) => {
    axios.post(`${API_URL}/messages`, { text: message.text, role })
      .then((response) => {
        setMessages([...messages, response.data]); // Append the new message
      })
      .catch((err) => {
        console.error('Error sending message:', err);
        toast.error('Error sending message.');
      });
  };

  // Function to delete all messages
  const deleteAllMessages = () => {
    axios.delete(`${API_URL}/messages`)
      .then((response) => {
        setMessages([]); // Clear the messages in the frontend
        toast.success('All messages deleted!');
      })
      .catch((err) => {
        console.error('Error deleting messages:', err);
        toast.error('Error deleting messages.');
      });
  };

  // Scroll to the bottom of the chat window whenever the messages update
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container d-flex flex-column" style={{ height: '100vh' }}>
      {/* Chat window */}
      <div
        className="chat-window flex-grow-1 overflow-auto p-3"
        style={{ maxHeight: 'calc(100vh - 80px)' }}  // Adjust height based on the chat input area
        ref={chatWindowRef}
      >
        {/* Display the messages in reverse order (latest first) */}
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg} />
        ))}
      </div>

      {/* Chat input and buttons */}
      <div className="chat-input-container position-fixed bottom-0 w-100 p-2 bg-light">
        <ChatInput
          input={input}
          setInput={setInput}
          onSendMessage={sendMessage}
          onDeleteMessages={deleteAllMessages}
        />
      </div>
    </div>
  );
}

export default App;
