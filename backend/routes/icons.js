const express = require('express');
const router = express.Router();
const Icon = require('../models/Icon');

// GET: всі ікони + пошук + сортування
router.get('/', async (req, res) => {
  const { search, sort } = req.query;
  let query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { number: +search || -1 },
      { shelf: +search || -1 },
      { note: { $regex: search, $options: 'i' } }
    ];
  }
  let icons = await Icon.find(query);
  if (sort === 'name') icons = icons.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'number') icons = icons.sort((a, b) => a.number - b.number);
  if (sort === 'shelf') icons = icons.sort((a, b) => a.shelf - b.shelf);
  res.json(icons);
});

router.post('/', async (req, res) => {
  const icon = new Icon(req.body);
  await icon.save();
  res.status(201).json(icon);
});

router.put('/:id', async (req, res) => {
  const icon = await Icon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(icon);
});

router.delete('/:id', async (req, res) => {
  await Icon.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;