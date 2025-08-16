const express = require('express');
const router = express.Router();
const Deacon = require('../models/Deacon');
const auth = require('../middleware/auth');

// GET
router.get('/', async (req, res) => {
  res.json(await Deacon.find());
});

// POST
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin' });
  const deacon = new Deacon(req.body);
  await deacon.save();
  res.status(201).json(deacon);
});

// PUT
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin' });
  const deacon = await Deacon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(deacon);
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admin' });
  await Deacon.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;