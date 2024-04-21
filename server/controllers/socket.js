const generateRoomId = require('../utils/generateRoomId');

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Generate a new room ID when a user connects without a room ID
    socket.on('create_room', () => {
      const roomId = generateRoomId();
      socket.emit('room_id', roomId);
      socket.join(roomId);
      console.log(`Room ${roomId} created`);
    });

    // Join a room when a user connects with a room ID
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);
      io.to(roomId).emit('message', `A new user has joined room ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
