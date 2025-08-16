const mongoose = require('mongoose');

const deaconScheduleSchema = new mongoose.Schema({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  deacon: { type: String, required: true },
  akathistDate: { type: String },
  akathistDeacon: { type: String }
});

module.exports = mongoose.model('DeaconSchedule', deaconScheduleSchema);