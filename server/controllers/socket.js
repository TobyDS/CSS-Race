const generateRoomId = require('../utils/generateRoomId');
const Image = require('../models/image');

// Mapping of room IDs to images
const roomImages = {};

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Generate a new room ID and a random image when a user connects without a room ID
    socket.on('create_room', async () => {
      try {
        const roomId = generateRoomId();
        Image.random((image) => {
          const base64Image = image.img.toString('base64');
          const base64Image2x = image.img_2x.toString('base64');
          const parsedImage = {
            id: image._id,
            img: base64Image,
            img_2x: base64Image2x,
            colors: image.colors,
          };
          console.log('image', parsedImage);
          roomImages[roomId] = parsedImage;
          socket.emit('room_id', roomId);
          socket.emit('image', parsedImage);
          socket.join(roomId);
          console.log(`Room ${roomId} created`);
        });
      } catch (error) {
        console.error(`Error creating room: ${error}`);
      }
    });

    // Join a room when a user connects with a room ID
    socket.on('join_room', (roomId) => {
      try {
        const image = roomImages[roomId];
        if (image) {
          socket.emit('image', image);
          socket.join(roomId);
          console.log(`User joined room ${roomId}`);
          io.to(roomId).emit('message', `A new user has joined room ${roomId}`);
        } else {
          console.error(`No image found for room ${roomId}`);
        }
      } catch (error) {
        console.error(`Error joining room: ${error}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
