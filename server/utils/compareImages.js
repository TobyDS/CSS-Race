const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

async function compareImages (targetImage, userImage) {
  try {
    // Decode the image buffers to RGBA format
    const targetPng = PNG.sync.read(targetImage.img_Buffer);
    const userPng = PNG.sync.read(userImage.img_Buffer);

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
    throw error;
  }
}

module.exports = compareImages;
