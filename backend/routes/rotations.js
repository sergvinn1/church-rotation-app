const express = require('express');
const router = express.Router();
const Rotation = require('../models/Rotation');

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

module.exports = router;