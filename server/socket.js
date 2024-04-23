const Room = require('./libs/Room');
const compareImages = require('./utils/compareImages');
const codeToImage = require('./utils/codeToImage');

let activeRooms = [];

function disconnectFromPrevious (socket) {
  // Find the room that the user is currently in
  const currentRoom = activeRooms.find((room) => room.users[socket.id]);

  // If the user is in a room, remove them from it
  if (currentRoom) {
    socket.emit('message', `You have left room ${currentRoom.id}`);
    currentRoom.removeUser(socket.id);
    socket.leave(currentRoom.id);

    // If the room is empty, remove it from the active rooms
    if (Object.keys(currentRoom.users).length === 0) {
      activeRooms = activeRooms.filter((room) => room.id !== currentRoom.id);
    }
  }
}

module.exports = function (io) {
  io.on('connection', (socket) => {
    // Generate a new room ID and a random image when a user connects without a room ID
    socket.on('create_room', async () => {
      try {
        disconnectFromPrevious(socket);
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
        disconnectFromPrevious(socket);
        const room = activeRooms.find((room) => room.id === roomId);
        const image = room.targetImage;
        if (image) {
          socket.emit('image', image);
          socket.join(roomId);
          room.addUser(socket.id);
          const opponent = Object.values(room.users).find(
            (user) => user.id !== socket.id
          );
          socket.emit('opponent_status', opponent.isReady);
          socket
            .to(roomId)
            .emit('opponent_status', room.users[socket.id].isReady);
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
        const room = activeRooms.find((room) => room.containsUser(socket.id));
        // Check if room is defined
        if (!room) {
          io.to(room.id).emit('user_score', 0);
          return;
        }

        const user = Object.values(room.users).find(
          (user) => user.id === socket.id
        );

        if (!user) {
          io.to(room.id).emit('user_score', 0);
          return;
        }
        // Check code is defined
        if (!code) {
          io.to(room.id).emit('user_score', 0);
        }

        const userImage = await codeToImage(code);

        // Call compareImages with the room's target image and the code
        const score = await compareImages(room.targetImage, userImage);
        if (score > user.bestScore) {
          user.bestScore = score;
        }

        // Emit the score to the client
        socket.emit('user_score', score);
        socket.to(room.id).emit('opponent_score', score);
        if (score === 100) {
          io.to(room.id).emit('game_over');
        }
      } catch (error) {
        console.error(`Error comparing images - ${error}`);
      }
    });

    socket.on('ready', async () => {
      try {
        const room = activeRooms.find((room) => room.containsUser(socket.id));
        if (room) {
          // Check if room.users is defined
          if (room.users) {
            const user = room.users[socket.id];
            user.isReady = true;
            socket.to(room.id).emit('opponent_ready');
            if (
              Object.values(room.users).length > 1 &&
              Object.values(room.users).every((user) => user.isReady)
            ) {
              io.to(room.id).emit('all_ready');
              console.log(room.users[socket.id]);
            }
          } else {
            console.error('Error: room.users is undefined');
          }
        }
      } catch (error) {
        console.error(`Error setting player ready - ${error}`);
      }
    });

    socket.on('not_ready', async () => {
      try {
        const room = activeRooms.find((room) => room.containsUser(socket.id));
        if (room) {
          const user = room.users[socket.id];
          user.isReady = false;
          socket.to(room.id).emit('opponent_not_ready');
          if (
            Object.values(room.users).some((user) => user.isReady === false)
          ) {
            io.to(room.id).emit('not_all_ready');
          }
        }
      } catch (error) {
        console.error(`Error setting player not ready - ${error}`);
      }
    });

    const TEN_MINUTES_IN_MS = 600000;

    socket.on('start_game', async () => {
      try {
        const room = activeRooms.find((room) => room.containsUser(socket.id));
        if (room) {
          io.to(room.id).emit('start_game');

          // Start the 10-minute countdown
          setTimeout(() => {
            // Check if the room is empty
            if (Object.keys(room.users).length === 0) {
              return;
            }

            // Check if any user has reached a score of 100
            const winner = room.checkForWinner();

            if (!winner) {
              io.to(room.id).emit('game_over');
            }
          }, TEN_MINUTES_IN_MS);
        }
      } catch (error) {
        console.error(`Error starting game - ${error}`);
      }
    });

    socket.on('code_update', (code) => {
      try {
        const room = activeRooms.find((room) => room.containsUser(socket.id));
        if (room) {
          socket.to(room.id).emit('code_update', code);
        }
      } catch (error) {
        console.error(`Error updating code - ${error}`);
      }
    });

    socket.on('disconnect', () => {
      // Find the room that the socket was in
      const room = activeRooms.find((room) => room.containsUser(socket.id));

      if (room) {
        // Remove the user from the room
        room.removeUser(socket.id);

        // Emit a message to the room
        io.to(room.id).emit('opponent_disconnected', socket.id);

        // If the room is empty, remove it from the active rooms
        if (room.users.length === 0) {
          activeRooms = activeRooms.filter(
            (activeRoom) => activeRoom.id !== room.id
          );
        }
      }
    });
  });
};
