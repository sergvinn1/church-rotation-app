const express = require("express");
const router = express.Router();
const PrayerRite = require("../models/PrayerRite");

// Multer для PDF
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Створюємо папку для pdf, якщо немає
const uploadDir = path.join(__dirname, "..", "uploads", "prayer-rites");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Унікальна назва
    cb(null, Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9.]+/g, "_"));
  }
});
const upload = multer({ storage });

// Отримати всі чини (з пошуком і сортуванням)
router.get("/", async (req, res) => {
  const { search = "", sort = "name" } = req.query;
  const query = {};
  if (search) query.name = { $regex: search, $options: "i" };
  let sortObj = {};
  if (sort === "popularity") sortObj = { popularity: -1 };
  else sortObj = { name: 1 };
  const rites = await PrayerRite.find(query).sort(sortObj);
  res.json(rites);
});

// Додати чин (з PDF)
router.post("/", upload.single("pdf"), async (req, res) => {
  const { name } = req.body;
  let pdfUrl = "";
  if (req.file) {
    pdfUrl = "/uploads/prayer-rites/" + req.file.filename;
  }
  const rite = new PrayerRite({ name, pdfUrl });
  await rite.save();
  res.json(rite);
});

// Оновити чин (з PDF)
router.put("/:id", upload.single("pdf"), async (req, res) => {
  const { name } = req.body;
  let update = { name };
  if (req.file) {
    update.pdfUrl = "/uploads/prayer-rites/" + req.file.filename;
  }
  const rite = await PrayerRite.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(rite);
});

// Видалити чин (і PDF)
router.delete("/:id", async (req, res) => {
  const rite = await PrayerRite.findById(req.params.id);
  if (rite?.pdfUrl) {
    const filePath = path.join(__dirname, "..", rite.pdfUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  await PrayerRite.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// Збільшити популярність
router.post("/:id/increment-popularity", async (req, res) => {
  const rite = await PrayerRite.findByIdAndUpdate(
    req.params.id,
    { $inc: { popularity: 1 } },
    { new: true }
  );
  res.json({ popularity: rite ? rite.popularity : 0 });
});

module.exports = router;