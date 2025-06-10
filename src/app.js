const express = require('express');
const app = express();
const db = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoute = require('./routes/user');
app.use(express.json());
app.use('/uploads', express.static('uploads'))




app.use("/api",userRoute);
app.use("/api/auth",authRoutes);
app.use("/api/test",testRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
