const Room = require('./libs/Room');
const compareImages = require('./utils/compareImages');

const activeRooms = [];

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    // Generate a new room ID and a random image when a user connects without a room ID
    socket.on('create_room', async () => {
      try {
        const room = await Room.create();
        activeRooms.push(room);
        socket.emit('room_id', room.id);
        const image = room.targetImage;
        if (image) {
          socket.emit('image', image);
          socket.join(room.id);
          room.addUser(socket.id);
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
        const room = activeRooms.find((room) => room.id === roomId);
        const image = room.targetImage;
        if (image) {
          socket.emit('image', image);
          socket.join(roomId);
          room.addUser(socket.id);
          socket
            .to(roomId)
            .emit('message', `A new user has joined room ${roomId}`);
        } else {
          console.error(`No image found for room ${roomId}`);
        }
      } catch (error) {
        console.error(`Error joining room: ${error}`);
      }
    });

    socket.on('code_submit', async (code) => {
      try {
        // Get the room that the socket is currently connected to
        const room = activeRooms.find((room) => room.users.includes(socket.id));

        // FIXME[epic=DELETE ME]
        const room2 = activeRooms[0];

        // TODO[epic=Code To Image]: GENERATE IMAGE FROM CODE

        // Check if room is defined
        if (!room) {
          console.error(`No room found with ID ${roomId}`);
          return;
        }

        // Call compareImages with the room's target image and the code
        // TODO[epic=Image Comparison]: Replace room2.targetImage with the image generated from the code
        const score = await compareImages(room.targetImage, room2.targetImage);

        // Emit the score to the client
        socket.emit('score', score);
      } catch (error) {
        console.error(`Error comparing images: ${error}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
