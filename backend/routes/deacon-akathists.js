const express = require('express');
const router = express.Router();
const DeaconAkathist = require('../models/DeaconAkathist');

router.get('/', async (req, res) => {
  const { date } = req.query;
  let query = {};
  if (date) query.date = date;
  res.json(await DeaconAkathist.find(query));
});

router.post('/', async (req, res) => {
  const akathist = new DeaconAkathist(req.body);
  await akathist.save();
  res.status(201).json(akathist);
});

router.delete('/:id', async (req, res) => {
  await DeaconAkathist.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;