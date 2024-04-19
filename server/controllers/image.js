const Image = require('../models/image');

/**
 * Controller for handling image-related operations.
 */
const imageController = {
  /**
   * Get all images.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with the images.
   */
  getImages: async (req, res) => {
    try {
      const images = await Image.find();
      res.status(200).json({ images });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to get images', error: error.message });
    }
  },

  /**
   * Get an image by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with the image.
   */
  getImageById: async (req, res) => {
    try {
      const { id } = req.params;
      const image = await Image.findById(id);
      const base64Image = image.img.toString('base64');
      const base64Image2x = image.img_2x.toString('base64');
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      res.status(200).json({
        id: image._id,
        img: base64Image,
        img_2x: base64Image2x,
        colors: image.colors,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to get image', error: error.message });
    }
  },

  /**
   * Get a random image.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with the random image.
   */
  getRandomImage: async (req, res) => {
    try {
      Image.random((image) => {
        console.log(image);
        const base64Image = image.img.toString('base64');
        const base64Image2x = image.img_2x.toString('base64');
        res.status(200).json({
          id: image._id,
          img: base64Image,
          img_2x: base64Image2x,
          colors: image.colors,
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to get random image', error: error.message });
    }
  },

  // TODO: REMOVE
  // ! FOR TESTING PURPOSES ONLY:
  /**
   * Add an image.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with the added image.
   */
  addImage: async (req, res) => {
    try {
      const { base64Image, base64Image_2x } = req.body;
      const bufferImage = Buffer.from(base64Image, 'base64');
      let newImage;
      if (base64Image_2x) {
        const bufferImage_2x = Buffer.from(base64Image_2x, 'base64');
        newImage = new Image({ img: bufferImage, img_2x: bufferImage_2x });
      } else {
        newImage = new Image({ img: bufferImage });
      }
      await newImage.save();
      res
        .status(201)
        .json({ message: 'Image added successfully', image: newImage });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to add image', error: error.message });
    }
  },

  // TODO: REMOVE
  // ! FOR TESTING PURPOSES ONLY:
  /**
   * Get an image by its ID as a string.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with the image as a string.
   */
  getImageByIdAsString: async (req, res) => {
    try {
      const { id } = req.params;
      const image = await Image.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      const base64Image = image.img.toString('base64');
      res.status(200).json({ base64Image });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to get image', error: error.message });
    }
  },
};

module.exports = imageController;
