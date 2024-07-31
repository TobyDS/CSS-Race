import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []); // Empty dependency array to ensure this runs only once

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
