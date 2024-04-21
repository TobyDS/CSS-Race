const Room = require('./libs/Room');
const compareImages = require('./utils/compareImages');
const codeToImage = require('./utils/codeToImage');

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
          const opponent = room.users.find((user) => user.id === socket.id);
          socket.emit('opponent_status', opponent.isReady);
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
        const user = room.users.find((user) => user.id === socket.id);
        // Check if room is defined
        if (!room) {
          throw new Error(`No room found with ID ${roomId}`);
        }

        // Check code is defined
        if (!code) {
          throw new Error('Code must have a value');
        }

        const userImage = await codeToImage(code);

        // Call compareImages with the room's target image and the code
        const score = await compareImages(room.targetImage, userImage);
        if (score > user.bestScore) {
          user.bestScore = score;
        }

        // Emit the score to the client
        socket.emit('user_score', { score });
        socket.to(room.id).emit('opponent_score', { score });
        if (score === 100) {
          io.to(room.id).emit('game_over', socket.id);
        }
      } catch (error) {
        socket.emit('error', error);
        console.error(`Error comparing images: ${error}`);
      }
    });

    socket.on('ready', async () => {
      try {
        const room = activeRooms.find((room) => room.users.includes(socket.id));
        const user = room.users.find((user) => user.id === socket.id);
        user.isReady = true;
        socket.to(room.id).emit('opponent_ready', socket.id);
        if (room.users.every((user) => user.isReady)) {
          io.to(room.id).emit('all_ready');
        }
      } catch (error) {
        console.error(`Error setting player ready: ${error}`);
      }
    });

    socket.on('not_ready', async () => {
      try {
        const room = activeRooms.find((room) => room.users.includes(socket.id));
        const user = room.users.find((user) => user.id === socket.id);
        user.isReady = false;
        socket.to(room.id).emit('opponent_not_ready', socket.id);
      } catch (error) {
        console.error(`Error setting player not ready: ${error}`);
      }
    });

    const TEN_MINUTES_IN_MS = 600000;

    socket.on('start_game', async () => {
      try {
        const room = activeRooms.find((room) => room.users.includes(socket.id));
        io.to(room.id).emit('start_game');

        // Start the 10-minute countdown
        setTimeout(() => {
          // Check if a user has reached a score of 100
          const winner = room.users.find((user) => user.bestScore >= 100);

          if (!winner) {
            // If no user has reached a score of 100, find the user with the highest score
            const highestScorer = room.users.reduce((prev, current) =>
              prev.score > current.score ? prev : current
            );
            io.to(room.id).emit('game_over', highestScorer.id);
          }
        }, TEN_MINUTES_IN_MS);
      } catch (error) {
        console.error(`Error starting game: ${error}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
