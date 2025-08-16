const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Реєстрація
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hash, role: role || 'user' });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

// Логін
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid username or password' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid username or password' });

  // Створити JWT
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );
  res.json({ token, role: user.role, username: user.username });
});

module.exports = router;