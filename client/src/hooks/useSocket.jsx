import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSocketInit from '@hooks/useSocketInit';
import createEventHandlers from '@utils/socketEventHandlers';
import manageSocketEvents from '@utils/socketEventManager';
import useGameStore from '@store/useGameStore';
import {
  handleCreateRoom,
  handleJoinRoom,
  handleUserReady,
  handleUserNotReady,
} from '@utils/socketEmitHandlers';

function useSocket () {
  const socket = useSocketInit();
  const navigate = useNavigate();
  const { roomId, localUserReady, isHost } = useGameStore();

  const handleCreateRoomCallback = useCallback(() => {
    handleCreateRoom(socket, isHost, roomId);
  }, [socket, isHost, roomId]);

  const handleJoinRoomCallback = useCallback(() => {
    handleJoinRoom(socket, isHost, roomId);
  }, [socket, isHost, roomId]);

  useEffect(() => {
    if (socket) {
      if (isHost) {
        handleCreateRoomCallback();
      } else if (roomId) {
        handleJoinRoomCallback();
      }
    }
  }, [
    socket,
    isHost,
    roomId,
    handleCreateRoomCallback,
    handleJoinRoomCallback,
  ]);

  useEffect(() => {
    if (socket) {
      const eventHandlers = createEventHandlers(navigate);

      manageSocketEvents(socket, eventHandlers, 'on');

      return () => {
        manageSocketEvents(socket, eventHandlers, 'off');
      };
    }
  }, [socket, isHost, navigate]);

  useEffect(() => {
    if (localUserReady) {
      handleUserReady(socket, localUserReady);
    } else {
      handleUserNotReady(socket, localUserReady);
    }
  }, [localUserReady, socket]);

  return socket;
}

export default useSocket;
