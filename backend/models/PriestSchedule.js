const mongoose = require('mongoose');

const priestScheduleSchema = new mongoose.Schema({
  date: { type: String, required: true },
  priest: { type: String, required: true },
  church_duty: { type: String, required: true },
  city_duty: { type: String, required: true }
});

module.exports = mongoose.model('PriestSchedule', priestScheduleSchema);