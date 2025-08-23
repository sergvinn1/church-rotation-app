const mongoose = require("mongoose");

const PrayerRiteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pdfUrl: { type: String },
  popularity: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("PrayerRite", PrayerRiteSchema);