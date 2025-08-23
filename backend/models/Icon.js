const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Назва ікони
  number: { type: Number, required: true },    // Номер ікони
  shelf: { type: Number, required: true },     // Номер шафи
  note: { type: String },                      // Примітка (необов'язково)
  photo: { type: String }                      // base64-строка або посилання
});

module.exports = mongoose.model('Icon', iconSchema);