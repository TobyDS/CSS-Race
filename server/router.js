'use strict';

const router = require('express').Router();
const imageController = require('./controllers/image');

router.get('/', (req, res) => {
  res.send('Hello world');
});

// TODO: REMOVE
// ! FOR TESTING PURPOSES ONLY:
router.get('/testing/images/:id', imageController.getImageByIdAsString);
router.post('/testing/images', imageController.addImage);

router.get('/images/:id', imageController.getImageById);
router.get('/images', imageController.getImages);

router.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;
