const Room = require('./libs/Room');

const activeRooms = {};

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Generate a new room ID and a random image when a user connects without a room ID
    socket.on('create_room', async () => {
      try {
        const room = await Room.create();
        activeRooms[room.id] = room;
        socket.emit('room_id', room.id);
        const image = room.targetImage;
        if (image) {
          socket.emit('image', image);
          socket.join(room.id);
          console.log(`User joined room ${room.id}`);
          io.to(room.id).emit(
            'message',
            `A new user has joined room ${room.id}`
          );
        } else {
          console.error(`No image found for room ${room.id}`);
        }
      } catch (error) {
        console.error(`Error creating room: ${error}`);
      }
    });

    // Join a room when a user connects with a room ID
    socket.on('join_room', (roomId) => {
      try {
        const room = activeRooms[roomId];
        const image = room.targetImage;
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
