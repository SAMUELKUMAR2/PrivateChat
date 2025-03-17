// routes/messages.js
const express = require('express');
const Message = require('../Model/Message'); // Import Message model
const router = express.Router();

// Post a new message
router.post('/', async (req, res) => {
  const { text, role } = req.body;

  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const newMessage = new Message({
      text,
      role,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error in /messages:", err);
    res.status(500).json({ message: 'Error sending message', error: err.message });
  }
});

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Delete all messages
router.delete('/', async (req, res) => {
  try {
    await Message.deleteMany();
    res.json({ message: 'All messages deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting messages' });
  }
});

module.exports = router;
