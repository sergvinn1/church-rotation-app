require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const deaconsRouter = require('./routes/deacons');
const priestsRouter = require('./routes/priests');
const deaconSchedulesRouter = require('./routes/deacon-schedules');
const priestSchedulesRouter = require('./routes/priest-schedules');
const deaconAkathistsRouter = require('./routes/deacon-akathists');
const iconsRouter = require('./routes/icons');
const akathistsRouter = require('./routes/akathists');
const prayerRitesRouter = require('./routes/prayer-rites');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Підключено до MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

// Основні роутери API
app.use('/api/deacons', deaconsRouter);
app.use('/api/priests', priestsRouter);
app.use('/api/deacon-schedules', deaconSchedulesRouter);
app.use('/api/priest-schedules', priestSchedulesRouter);
app.use('/api/deacon-akathists', deaconAkathistsRouter);
app.use('/api/icons', iconsRouter);
app.use('/api/akathists', akathistsRouter);
app.use('/api/prayer-rites', prayerRitesRouter);

// Для роздачі PDF та інших файлів
app.use('/uploads', express.static('uploads'));

// Авторизація/реєстрація
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend запущено на порті ${PORT}`);
});