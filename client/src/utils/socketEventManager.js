const manageSocketEvents = (socket, eventHandlers, action) => {
  Object.entries(eventHandlers).forEach(([event, handler]) => {
    if (action === 'on') {
      socket.on(event, handler);
    } else if (action === 'off') {
      socket.off(event, handler);
    }
  });
};

export default manageSocketEvents;
