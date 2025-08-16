require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const deaconsRouter = require('./routes/deacons');
const priestsRouter = require('./routes/priests');
const deaconSchedulesRouter = require('./routes/deacon-schedules');
const priestSchedulesRouter = require('./routes/priest-schedules');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Підключено до MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/api/deacons', deaconsRouter);
app.use('/api/priests', priestsRouter);
app.use('/api/deacon-schedules', deaconSchedulesRouter);
app.use('/api/priest-schedules', priestSchedulesRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Backend запущено на порті ${process.env.PORT || 4000}`);
});