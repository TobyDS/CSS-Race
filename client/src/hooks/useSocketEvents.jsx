import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '@hooks/useSocket';
import createEventHandlers from '@utils/socketEventHandlers';
import manageSocketEvents from '@utils/socketEventManager';
import useStore from '@store/useStore';

const useSocketEvents = (isHost) => {
  const socket = useSocket();
  const navigate = useNavigate();
  const { roomId, setRoomId, userIsReady } = useStore();

  const handleCreateRoom = useCallback(() => {
    socket.emit('create_room');
  }, [socket]);

  const handleJoinRoom = useCallback(() => {
    setRoomId(roomId);
    socket.emit('join_room', roomId);
  }, [socket, roomId, setRoomId]);

  useEffect(() => {
    if (isHost) {
      handleCreateRoom();
    } else if (roomId) {
      handleJoinRoom();
    }
  }, [isHost, roomId, handleCreateRoom, handleJoinRoom]);

  useEffect(() => {
    const eventHandlers = createEventHandlers(isHost, navigate);

    manageSocketEvents(socket, eventHandlers, 'on');

    return () => {
      manageSocketEvents(socket, eventHandlers, 'off');
    };
  }, [socket, isHost, navigate]);

  useEffect(() => {
    if (userIsReady) {
      socket.emit('ready');
    } else {
      socket.emit('not_ready');
    }
  }, [userIsReady, socket]);
};

export default useSocketEvents;
