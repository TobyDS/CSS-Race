/**
 * @fileoverview This file contains the configuration for connecting to the MongoDB database using Mongoose.
 * @module models/index
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

/**
 * The URI for connecting to the MongoDB database.
 * @type {string}
 */
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
