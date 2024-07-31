import { useContext } from 'react';
import SocketProvider from '@context/SocketContext';

export default function useSocket () {
  return useContext(SocketProvider);
}
