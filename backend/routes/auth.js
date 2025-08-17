const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // шлях до вашої моделі користувача
const router = express.Router();

// Реєстрація нового користувача (у т.ч. адміна)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Перевірка чи користувач вже існує
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'Користувач з таким імʼям або email вже існує!' });
    }

    // Хешування пароля
    const hash = await bcrypt.hash(password, 10);

    // Створення користувача
    const user = new User({
      username,
      email,
      password: hash,
      role: role || 'user'
    });

    await user.save();

    res.status(201).json({ message: 'Користувач успішно створений!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

module.exports = router;