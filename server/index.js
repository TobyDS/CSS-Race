/**
 * Express server for CSS Race game.
 * @module index
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const router = require(path.join(__dirname, './router.js'));
const setupSocketListeners = require(path.join(__dirname, './socket.js'));

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './temp.html'));
});

setupSocketListeners(io);

app.use(router);

/**
 * Start the server and listen on the specified port.
 * @function
 * @name listen
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - The callback function to execute once the server is up and running.
 * @returns {void}
 */
server.listen(PORT, () =>
  console.log(`> Server is up and running on ${HOST}:${PORT}`)
);
