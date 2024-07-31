import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

const SocketContext = createContext();

export default function SocketProvider ({ children }) {
  const [socket] = useState(() =>
    io(SOCKET_SERVER_URL, {
      reconnectionDelay: 1000,
    })
  );

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.node,
};
