const mongoose = require('mongoose');

const deaconSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true }
});

module.exports = mongoose.model('Deacon', deaconSchema);