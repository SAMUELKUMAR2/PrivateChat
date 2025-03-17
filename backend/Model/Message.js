const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'user'], required: true }, // Store the role of the sender
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
