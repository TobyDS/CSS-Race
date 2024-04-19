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

function getRandom (callback) {
  this.countDocuments()
    .then((count) => {
      const rand = Math.floor(Math.random() * count);
      this.findOne()
        .skip(rand)
        .then((image) => callback(image))
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

imageSchema.statics.random = getRandom;

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
