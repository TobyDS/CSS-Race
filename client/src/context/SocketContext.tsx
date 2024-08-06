import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { ServerToClientEvents, ClientToServerEvents } from '../types/socketTypes';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

export const SocketContext = createContext<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps): JSX.Element => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_SERVER_URL);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
