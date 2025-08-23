const express = require("express");
const router = express.Router();
const Akathist = require("../models/Akathist");

// Отримати всі акафісти (з пошуком і сортуванням)
router.get("/", async (req, res) => {
  const { search = "", sort = "name" } = req.query;
  const query = {};
  if (search) query.name = { $regex: search, $options: "i" };
  const akathists = await Akathist.find(query).sort({ [sort]: 1 });
  res.json(akathists);
});

// Додати акафіст
router.post("/", async (req, res) => {
  const { name, number, note } = req.body;
  const akathist = new Akathist({ name, number, note });
  await akathist.save();
  res.json(akathist);
});

// Оновити акафіст
router.put("/:id", async (req, res) => {
  const { name, number, note } = req.body;
  const akathist = await Akathist.findByIdAndUpdate(
    req.params.id,
    { name, number, note },
    { new: true }
  );
  res.json(akathist);
});

// Видалити акафіст
router.delete("/:id", async (req, res) => {
  await Akathist.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;