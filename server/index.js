/**
 * Express server for CSS Race game.
 * @module index
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const router = require(path.join(__dirname, './router.js'));
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

app.use(express.json());
app.use(cors());
app.use(router);

/**
 * Start the server and listen on the specified port.
 * @function
 * @name listen
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - The callback function to execute once the server is up and running.
 * @returns {void}
 */
app.listen(PORT, () =>
  console.log(`> Server is up and running on ${HOST}:${PORT}`)
);
