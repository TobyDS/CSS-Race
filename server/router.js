'use strict';

const router = require('express').Router();
const DB = require('./models');

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.all('*', (req, res) => {
  res.status(404).send('Route not found');
});

module.exports = router;
