const mongoose = require('mongoose');

const rotationSchema = new mongoose.Schema({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  roles: {
    служащий: { type: String, required: true },
    черговий_по_храму: { type: String, required: true },
    черговий_по_місту: { type: String, required: true }
  }
});

module.exports = mongoose.model('Rotation', rotationSchema);