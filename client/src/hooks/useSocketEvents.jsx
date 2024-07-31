import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSocket from '@hooks/useSocket';
import createEventHandlers from '@utils/socketEventHandlers';
import manageSocketEvents from '@utils/socketEventManager';
import useStore from '@store/useStore';

const useSocketEvents = (isHost) => {
  const socket = useSocket();
  const navigate = useNavigate();
  const { roomId, setRoomId, userIsReady } = useStore();

  const handleCreateRoom = useCallback(() => {
    if (socket && isHost && !roomId) {
      socket.emit('create_room');
    }
  }, [socket, isHost, roomId]);

  const handleJoinRoom = useCallback(() => {
    if (socket && !isHost && roomId) {
      socket.emit('join_room', roomId);
    }
  }, [socket, isHost, roomId]);

  useEffect(() => {
    if (socket) {
      if (isHost) {
        handleCreateRoom();
      } else if (roomId) {
        handleJoinRoom();
      }
    }
  }, [socket, isHost, roomId, handleCreateRoom, handleJoinRoom]);

  useEffect(() => {
    if (socket) {
      const eventHandlers = createEventHandlers(isHost, navigate);

      manageSocketEvents(socket, eventHandlers, 'on');

      return () => {
        manageSocketEvents(socket, eventHandlers, 'off');
      };
    }
  }, [socket, isHost, navigate]);

  useEffect(() => {
    if (socket) {
      if (userIsReady) {
        socket.emit('ready');
      } else {
        socket.emit('not_ready');
      }
    }
  }, [userIsReady, socket]);
};

export default useSocketEvents;
