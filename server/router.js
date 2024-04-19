'use strict';

const router = require('express').Router();
const imageController = require('./controllers/image');

router.get('/', (req, res) => {
  res.send('Hello world');
});

// TODO: REMOVE
// ! FOR TESTING PURPOSES ONLY:
router.get('/testing/image/:id', imageController.getImageByIdAsString);
router.post('/testing/image', imageController.addImage);

router.get('/image/random', imageController.getRandomImage);
router.get('/image/:id', imageController.getImageById);
router.get('/images', imageController.getImages);

router.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;
