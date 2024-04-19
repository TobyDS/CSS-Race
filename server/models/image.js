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
  colors: {
    type: [String],
    required: false,
  },
});

imageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
