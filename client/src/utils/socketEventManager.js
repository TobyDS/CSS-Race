/* eslint-disable no-console */
/**
 * Attaches or detaches event handlers to/from a socket.io instance and wraps them in a logger for debugging.
 *
 * @param {Object} socket - The socket.io instance to attach/detach event handlers to/from.
 * @param {Object} eventHandlers - An object where keys are event names and values are the corresponding event handler functions.
 * @param {string} action - The action to perform, either 'on' to attach or 'off' to detach the event handlers.
 */
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
      socket.off(event); // Detach any existing handlers for this event
      socket.on(event, wrappedHandler);
    } else if (action === 'off') {
      socket.off(event, wrappedHandler);
    }
  });
};

export default manageSocketEvents;
