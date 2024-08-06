import { useContext } from 'react';
import { SocketContext } from '@context/SocketContext';

export default function useSocketInit () {
  return useContext(SocketContext);
}
