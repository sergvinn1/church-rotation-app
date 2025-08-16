const express = require('express');
const router = express.Router();
const Priest = require('../models/Priest');

// GET
router.get('/', async (req, res) => {
  res.json(await Priest.find());
});

// POST
router.post('/', async (req, res) => {
  const priest = new Priest(req.body);
  await priest.save();
  res.status(201).json(priest);
});

// PUT
router.put('/:id', async (req, res) => {
  const priest = await Priest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(priest);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Priest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;