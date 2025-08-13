const express = require('express');
const router = express.Router();
const Rotation = require('../models/Rotation');
const auth = require('../middleware/auth');

// GET /api/rotations?from=YYYY-MM-DD&to=YYYY-MM-DD
router.get('/', async (req, res) => {
  const { from, to } = req.query;
  try {
    const query = {};
    if (from && to) {
      query.startDate = { $gte: from };
      query.endDate = { $lte: to };
    }
    const rotations = await Rotation.find(query);
    res.json(rotations);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання даних' });
  }
});

// Додавання чергування (тільки для адміна)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Тільки для адміна' });
    try {
      const { startDate, endDate, roles } = req.body;
      const rotation = new Rotation({ startDate, endDate, roles });
      await rotation.save();
      res.status(201).json(rotation);
    } catch (err) {
      res.status(500).json({ message: 'Помилка додавання' });
    }
  });

module.exports = router;