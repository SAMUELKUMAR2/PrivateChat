// routes/auth.js
const express = require('express');
const User = require('../Model/User'); // Import User model
const router = express.Router();

// Login route (assigns the role based on name)
router.post('/login', async (req, res) => {
  const { name } = req.body;


  // Save user in the database
  try {
    let user = await User.findOne({ name });
    let role = user.role;

    res.status(200).json({ message: 'Login successful', role });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user' });
  }
});

module.exports = router;
