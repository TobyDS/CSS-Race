/**
 * @fileoverview This file contains the configuration for connecting to the MongoDB database using Mongoose.
 * @module models/index
 */

import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * The URI for connecting to the MongoDB database.
 * @type {string}
 */
const URI: string =
  process.env.MONGO_URI || 'mongodb://localhost:27017/CSSRaceDatabase';

mongoose
  .connect(URI)
  .then(() => {
    console.log('MongoDB Connection Succeeded.');
  })
  .catch((err: any) => {
    console.log('Error in DB connection: ' + err);
  });

export default mongoose;
