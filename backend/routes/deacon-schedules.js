const express = require('express');
const router = express.Router();
const DeaconSchedule = require('../models/DeaconSchedule');

// GET (фільтр по датах)
router.get('/', async (req, res) => {
  const { from, to } = req.query;
  let query = {};
  if (from && to) {
    query.startDate = { $gte: from };
    query.endDate = { $lte: to };
  }
  res.json(await DeaconSchedule.find(query));
});

// POST
router.post('/', async (req, res) => {
  const schedule = new DeaconSchedule(req.body);
  await schedule.save();
  res.status(201).json(schedule);
});

// PUT
router.put('/:id', async (req, res) => {
  const schedule = await DeaconSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(schedule);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await DeaconSchedule.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;