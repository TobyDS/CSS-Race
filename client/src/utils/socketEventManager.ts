/* eslint-disable no-console */
import type { Socket } from 'socket.io-client';
import type { ServerToClientEvents } from '../types/socketTypes';

const manageSocketEvents = (
  socket: Socket<ServerToClientEvents>,
  eventHandlers: ServerToClientEvents,
  action: 'on' | 'off'
): void => {
  Object.entries(eventHandlers).forEach(([event, handler]) => {
    // Type-cast event to a key of ServerToClientEvents
    const typedEvent = event as keyof ServerToClientEvents;

    if (action === 'on') {
      socket.off(typedEvent); // Detach any existing handlers for this event
      socket.on(typedEvent, handler); // Attach the handler
    } else if (action === 'off') {
      socket.off(typedEvent, handler); // Detach the wrapped handler
    }
  });
};

export default manageSocketEvents;
