import type { Request, Response } from 'express';
import Image, { ImageDoc } from '../models/image';

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
  getImages: async (req: Request, res: Response) => {
    try {
      const images = await Image.find();
      res.status(200).json({ images });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get images',
        error: (error as Error).message,
      });
    }
  },

  /**
   * Get an image by its ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with the image.
   */
  getImageById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const image = await Image.findById(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }
      res.status(200).json(image);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get image',
        error: (error as Error).message,
      });
    }
  },

  /**
   * Get a random image.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Object} The response object with the random image.
   */
  getRandomImage: async (req: Request, res: Response) => {
    try {
      (Image as any).random((image: ImageDoc) => {
        res.status(200).json(image);
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get random image',
        error: (error as Error).message,
      });
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
  addImage: async (req: Request, res: Response) => {
    try {
      const { base64Image, base64Image_2x } = req.body;
      let newImage;
      if (base64Image_2x) {
        newImage = new Image({ img: base64Image, img_2x: base64Image_2x });
      } else {
        newImage = new Image({ img: base64Image });
      }
      await newImage.save();
      res
        .status(201)
        .json({ message: 'Image added successfully', image: newImage });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to add image',
        error: (error as Error).message,
      });
    }
  },
};

module.exports = imageController;
