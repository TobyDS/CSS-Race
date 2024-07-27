const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
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
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
instrument(io, {
  auth: {
    type: 'basic',
    username: 'admin',
    password: ADMIN_PASSWORD,
  },
  mode: 'development',
});

// Serve static files for the admin UI
app.use(
  '/',
  express.static(
    path.join(__dirname, 'node_modules', '@socket.io', 'admin-ui', 'ui', 'dist')
  )
);

app.use(express.json());
app.use(cors());

// Setup socket listeners
setupSocketListeners(io);

// Use the main router for API routes
app.use(router);

server.listen(PORT, () =>
  console.log(`> Server is up and running on ${HOST}:${PORT}`)
);
