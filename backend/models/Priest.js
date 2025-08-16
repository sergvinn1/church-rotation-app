const mongoose = require('mongoose');

const priestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true }
});

module.exports = mongoose.model('Priest', priestSchema);