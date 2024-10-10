import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { type ImageDoc } from '../models/image';

async function compareImages(targetImage: ImageDoc | null, userImage: Buffer) {
  try {
    // Decode the image buffers to RGBA format
    if (!targetImage) {
      throw new Error('No target image provided');
    }
    const targetPng = PNG.sync.read(targetImage.img_Buffer);
    const userPng = PNG.sync.read(userImage);

    // Perform image comparison using pixelmatch
    const width = targetPng.width;
    const height = targetPng.height;
    const diff = new Uint8Array(width * height * 4);
    const mismatchedPixels = pixelmatch(
      targetPng.data,
      userPng.data,
      diff,
      width,
      height,
      { threshold: 0.1 }
    );

    // Calculate the match score as a percentage
    const totalPixels = width * height;
    const matchScore = ((totalPixels - mismatchedPixels) / totalPixels) * 100;

    return matchScore;
  } catch (error) {
    console.error('Error comparing images:', error);
    return NaN;
  }
}

export default compareImages;
