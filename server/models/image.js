'use strict';

const mongoose = require('./');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  img: {
    type: Buffer,
    required: true,
  },
  img_2x: {
    type: Buffer,
    required: false,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
