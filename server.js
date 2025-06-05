require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/sequelize');
const User = require('./src/models/user'); 
const Booking = require('./src/models/Booking');
const Service = require('./src/models/Service');
const PORT = process.env.PORT || 5000;

const db = ()=>{
  sequelize.authenticate()
    .then(() => {
      console.log('Database connection established successfully.');
        app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}
db();


