const mongoose = require('mongoose');

const deaconAkathistSchema = new mongoose.Schema({
  date: { type: String, required: true },      // Дата акафісту
  deacon: { type: String, required: true }     // ID диякона
});

module.exports = mongoose.model('DeaconAkathist', deaconAkathistSchema);