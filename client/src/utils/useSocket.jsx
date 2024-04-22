import { useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';
const socket = io(SOCKET_SERVER_URL);

function useSocket (
  isHost,
  roomId,
  setRoomId,
  setOpponentIsReady,
  userIsReady,
  retrievedRoomId
) {
  useEffect(() => {
    if (isHost) {
      console.log('Sending create_room event');
      socket.emit('create_room');
    }
  }, [isHost]);

  useEffect(() => {
    if (!isHost) {
      setRoomId(retrievedRoomId);
      console.log('Sending join_room event with roomId:', retrievedRoomId);
      socket.emit('join_room', retrievedRoomId);
    }
  }, [isHost, retrievedRoomId, setRoomId]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Received connect event');
    });

    socket.on('room_id', (retRoomId) => {
      console.log('Received room_id event with roomId:', retRoomId);
      setRoomId(retRoomId);
    });

    socket.on('opponent_status', (isReady) => {
      console.log('Received opponent_status event with isReady:', isReady);
      setOpponentIsReady(isReady);
    });

    socket.on('opponent_ready', () => {
      console.log('Received opponent_ready event');
      setOpponentIsReady(true);
    });

    socket.on('opponent_not_ready', () => {
      console.log('Received opponent_not_ready event');
      setOpponentIsReady(false);
    });

    return () => {
      socket.off('connect');
      socket.off('room_id');
      socket.off('opponent_status');
    };
  }, [setRoomId, setOpponentIsReady]);

  useEffect(() => {
    if (userIsReady) {
      console.log('Sending ready event');
      socket.emit('ready');
    } else {
      console.log('Sending not_ready event');
      socket.emit('not_ready');
    }
  }, [userIsReady]);
}
export default useSocket;
