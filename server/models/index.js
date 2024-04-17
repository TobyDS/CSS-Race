const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/CSSRaceDatabase';

mongoose
  .connect(URI)
  .then(() => {
    console.log('MongoDB Connection Succeeded.');
  })
  .catch((err) => {
    console.log('Error in DB connection: ' + err);
  });

module.exports = mongoose;
