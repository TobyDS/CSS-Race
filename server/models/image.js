'use strict';

const mongoose = require('./');

const Schema = mongoose.Schema;

/**
 * @typedef {Object} Image
 * @property {Buffer} img - The image data.
 * @property {Buffer} img_2x - The high-resolution image data.
 * @property {string[]} colors - An array of colors associated with the image.
 */

const imageSchema = new Schema({
  img_Buffer: {
    type: Buffer,
    required: true,
  },
  img_2x_Buffer: {
    type: Buffer,
    required: false,
  },
  colors: {
    type: [String],
    required: false,
  },
});

imageSchema.virtual('img').get(function () {
  return this.img_Buffer.toString('base64');
});

imageSchema.virtual('img').set(function (base64) {
  this.img_Buffer = Buffer.from(base64, 'base64');
});

imageSchema.virtual('img_2x').get(function () {
  return this.img_2x_Buffer.toString('base64');
});

imageSchema.virtual('img_2x').set(function (base64) {
  this.img_2x_Buffer = base64 ? Buffer.from(base64, 'base64') : null;
});

imageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.img_Buffer;
    delete ret.img_2x_Buffer;
  },
});

/**
 * Get a random image from the collection.
 * @param {function} callback - The callback function to handle the retrieved image.
 */
imageSchema.statics.random = function (callback) {
  this.countDocuments()
    .then((count) => {
      const rand = Math.floor(Math.random() * count);
      this.findOne()
        .skip(rand)
        .then((image) => callback(image))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
