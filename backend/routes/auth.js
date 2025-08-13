const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Реєстрація (тільки для навчання, не публічна)
router.post('/register', async (req, res) => {
  // TODO: Реалізувати реєстрацію
  res.status(501).json({ message: 'Not Implemented' });
});

// Логін
router.post('/login', async (req, res) => {
  // TODO: Реалізувати логін
  res.status(501).json({ message: 'Not Implemented' });
});

module.exports = router;