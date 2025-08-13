require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const rotationsRouter = require('./routes/rotations');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Підключено до MongoDB'))
  .catch((err) => console.error('MongoDB error:', err));

// Роутінги
app.use('/api/rotations', rotationsRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Backend запущено на порті ${process.env.PORT || 4000}`);
});