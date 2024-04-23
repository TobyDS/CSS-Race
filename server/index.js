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
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './temp.html'));
});

setupSocketListeners(io);

app.use(router);

server.listen(PORT, () =>
  console.log(`> Server is up and running on ${HOST}:${PORT}`)
);
