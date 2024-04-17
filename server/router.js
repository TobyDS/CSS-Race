'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;
