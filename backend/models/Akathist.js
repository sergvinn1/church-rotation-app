const mongoose = require("mongoose");

const AkathistSchema = new mongoose.Schema({
  name:    { type: String, required: true },   // Назва акафісту
  number:  { type: Number, required: true },   // Номер акафісту
  note:    { type: String },                   // Примітка (необов'язково)
}, { timestamps: true });

module.exports = mongoose.model("Akathist", AkathistSchema);