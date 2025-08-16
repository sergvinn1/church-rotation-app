const express = require('express');
const router = express.Router();
const PriestSchedule = require('../models/PriestSchedule');

// GET (фільтр по датах)
router.get('/', async (req, res) => {
  const { from, to } = req.query;
  let query = {};
  if (from && to) {
    query.date = { $gte: from, $lte: to };
  }
  res.json(await PriestSchedule.find(query));
});

// POST
router.post('/', async (req, res) => {
  const schedule = new PriestSchedule(req.body);
  await schedule.save();
  res.status(201).json(schedule);
});

// PUT
router.put('/:id', async (req, res) => {
  const schedule = await PriestSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(schedule);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await PriestSchedule.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;