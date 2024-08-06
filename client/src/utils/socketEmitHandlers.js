/**
 * Emits a 'create_room' event if the socket is connected and the user is the host without a room ID.
 *
 * @param {Object} socket - The socket.io instance.
 * @param {boolean} isHost - Indicates if the user is the host.
 * @param {string} roomId - The current room ID.
 */
export const handleCreateRoom = (socket, isHost, roomId) => {
  if (socket && isHost && !roomId) {
    socket.emit('create_room');
  }
};

/**
 * Emits a 'join_room' event if the socket is connected and the user is not the host but has a room ID.
 *
 * @param {Object} socket - The socket.io instance.
 * @param {boolean} isHost - Indicates if the user is the host.
 * @param {string} roomId - The current room ID.
 */
export const handleJoinRoom = (socket, isHost, roomId) => {
  if (socket && !isHost && roomId) {
    socket.emit('join_room', roomId);
  }
};

/**
 * Emits a 'ready' event if the socket is connected and the local user is ready.
 *
 * @param {Object} socket - The socket.io instance.
 * @param {boolean} localUserReady - Indicates if the local user is ready.
 */
export const handleUserReady = (socket, localUserReady) => {
  if (socket && localUserReady) {
    socket.emit('ready');
  }
};

export const handleUserNotReady = (socket, localUserReady) => {
  if (socket && !localUserReady) {
    socket.emit('not_ready');
  }
};

/**
 * Emits a 'start_game' event if the socket is connected.
 *
 * @param {Object} socket - The socket.io instance.
 */
export const handleGameStart = (socket) => {
  if (socket) {
    socket.emit('start_game');
  }
};

/**
 * Handles the check submit event by submitting the combined code to the socket.
 * @param {SocketIO.Socket} socket - The socket object.
 * @param {Function} setCodeIsSubmitting - The function to set the code submission state.
 * @param {string} combinedCode - The combined code to be submitted.
 */
export const handleCodeSubmit = (socket, setCodeIsSubmitting, combinedCode) => {
  if (socket) {
    setCodeIsSubmitting(true);
    socket.emit('code_submit', combinedCode);
  }
};

/**
 * Handles the code update event by emitting the combined code to the socket.
 *
 * @param {SocketIO.Socket} socket - The socket to emit the code update event to.
 * @param {string} combinedCode - The combined code to be emitted.
 */
export const handleCodeUpdate = (socket, combinedCode) => {
  if (socket) {
    socket.emit('code_update', combinedCode);
  }
};
