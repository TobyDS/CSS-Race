const path = require('path');
const mongoose = require('mongoose');
const Image = require('../models/image');
const sampleImages = require('../data/sampleImages');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/CSSRaceDatabase';

mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedImages();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

/**
 * Seeds images into the database.
 * @returns {Promise<void>} A promise that resolves when the images are seeded successfully or rejects with an error.
 */
async function seedImages () {
  try {
    // Remove existing images
    await Image.deleteMany();

    sampleImages.forEach((image) => {
      image.img = Buffer.from(image.img, 'base64');
      if (image.img_2x) {
        image.img_2x = Buffer.from(image.img_2x, 'base64');
      }
    });
    // Insert example images into the database
    await Image.insertMany(sampleImages);

    console.log('Images seeded successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding images:', error);
    mongoose.disconnect();
  }
}
