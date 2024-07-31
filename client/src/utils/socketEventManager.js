/* eslint-disable no-console */
const manageSocketEvents = (socket, eventHandlers, action) => {
  const logEvent = (event, handler) => {
    return (...args) => {
      if (args.length > 0) {
        console.groupCollapsed(`SOCKET.IO RECEIVED: %c${event}`, 'color: cyan');
        console.log(...args);
        console.groupEnd();
      } else {
        console.log(
          `%cSOCKET.IO RECEIVED: %c${event}`,
          'font-weight: bold',
          'color: cyan; font-weight: bold'
        );
      }
      handler(...args);
    };
  };

  Object.entries(eventHandlers).forEach(([event, handler]) => {
    const wrappedHandler = logEvent(event, handler);
    if (action === 'on') {
      socket.on(event, wrappedHandler);
    } else if (action === 'off') {
      socket.off(event, wrappedHandler);
    }
  });
};

export default manageSocketEvents;
