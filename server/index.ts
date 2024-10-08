import express from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import setupSocketListeners from './socket';
require('dotenv').config();

const router = require(path.join(__dirname, './router.js'));

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

if (process.env.NODE_ENV === 'production') {
  instrument(io, {
    auth: {
      type: 'basic',
      username: 'admin',
      password: ADMIN_PASSWORD,
    },
    mode: 'production',
  });
} else {
  instrument(io, {
    auth: false,
    mode: 'development',
  });
}

// Serve static files for the admin UI
app.use(
  '/',
  express.static(
    path.join(__dirname, 'node_modules', '@socket.io', 'admin-ui', 'ui', 'dist')
  )
);

// Middleware to set Document-Policy header
app.use((req, res, next) => {
  res.set('Document-Policy', 'js-profiling');
  next();
});

app.use(express.json());
app.use(cors());

// Setup socket listeners
setupSocketListeners(io);

// Use the main router for API routes
app.use(router);

server.listen(PORT, () =>
  console.log(`> Server is up and running on ${HOST}:${PORT}`)
);
