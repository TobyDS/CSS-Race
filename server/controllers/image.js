const Image = require('../models/image');

const imageController = {
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

  getImageById: async (req, res) => {
    try {
      const { id } = req.params;
      const image = await Image.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      res.status(200).json({ image });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to get image', error: error.message });
    }
  },

  // TODO: REMOVE
  // ! FOR TESTING PURPOSES ONLY:
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
