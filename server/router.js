/**
 * Express router for handling API routes related to images.
 * @module router
 */

'use strict';

const router = require('express').Router();
const imageController = require('./controllers/image');

/**
 * Route for the root endpoint.
 * @name GET /
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/', (req, res) => {
  res.send('Hello world');
});

// TODO: REMOVE
// ! FOR TESTING PURPOSES ONLY:

/**
 * Route for getting an image by ID as a string.
 * @name GET /testing/image/:id
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/testing/image/:id', imageController.getImageByIdAsString);

/**
 * Route for adding an image.
 * @name POST /testing/image
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/testing/image', imageController.addImage);

/**
 * Route for getting a random image.
 * @name GET /image/random
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/image/random', imageController.getRandomImage);

/**
 * Route for getting an image by ID.
 * @name GET /image/:id
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/image/:id', imageController.getImageById);

/**
 * Route for getting all images.
 * @name GET /images
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.get('/images', imageController.getImages);

/**
 * Route for handling all other routes that are not defined.
 * @name ALL *
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;
