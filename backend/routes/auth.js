const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Реєстрація
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const candidate = await User.findOne({ username });
    if (candidate) return res.status(400).json({ message: 'Користувач вже існує' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash, role: 'admin' });
    await user.save();

    res.status(201).json({ message: 'Адмін створений' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка реєстрації' });
  }
});

// Логін
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Невірний логін або пароль' });

    const isPassValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPassValid) return res.status(400).json({ message: 'Невірний логін або пароль' });

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Помилка логіну' });
  }
});

module.exports = router;