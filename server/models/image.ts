'use strict';

import mongoose from './index';

const { Schema, model } = mongoose;

export interface ImageDoc extends mongoose.Document {
  img_Buffer: Buffer;
  img_2x_Buffer: Buffer | null;
  colors: string[];
  img: string;
  img_2x: string | null;
}

const imageSchema = new Schema<ImageDoc>({
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

imageSchema.virtual('img').set(function (base64: string) {
  this.img_Buffer = Buffer.from(base64, 'base64');
});

imageSchema.virtual('img_2x').get(function () {
  return this.img_2x_Buffer ? this.img_2x_Buffer.toString('base64') : null;
});

imageSchema.virtual('img_2x').set(function (base64: string | null) {
  this.img_2x_Buffer = base64 ? Buffer.from(base64, 'base64') : null;
});

imageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc: mongoose.Document, ret: { [key: string]: any }) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.img_Buffer;
    delete ret.img_2x_Buffer;
  },
});

imageSchema.statics.random = function (
  callback: (image: ImageDoc | null) => void
) {
  this.countDocuments()
    .then((count: number) => {
      const rand = Math.floor(Math.random() * count);
      this.findOne()
        .skip(rand)
        .then((image: ImageDoc | null) => callback(image))
        .catch((err: any) => console.error(err));
    })
    .catch((err: any) => console.error(err));
};

const Image = model<ImageDoc>('Image', imageSchema);

export default Image;
