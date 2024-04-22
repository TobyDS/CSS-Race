import { check } from 'prettier';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

const socket = io(SOCKET_SERVER_URL);
let setLoadingFunction = null;

const socketFunctions = {
  useSocket: function (
    isHost,
    setRoomId,
    setOpponentIsReady,
    userIsReady,
    retrievedRoomId,
    setStartEnabled,
    image,
    setImage
  ) {
    const navigate = useNavigate();
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

      socket.on('all_ready', () => {
        console.log('all_ready event received');
        setStartEnabled(true);
      });

      socket.on('not_all_ready', () => {
        console.log('not_all_ready event received');
        setStartEnabled(false);
      });

      socket.on('image', (image) => {
        setImage(image);
      });

      socket.on('start_game', () => {
        navigate('/battle', { state: { image: image } });
      });

      socket.on('user_score', async (score) => {
        if (setLoadingFunction) {
          setLoadingFunction(false);
        }
        console.log('Received user_score event with score:', score);
      });

      return () => {
        socket.off('connect');
        socket.off('room_id');
        socket.off('opponent_status');
      };
    }, [
      setRoomId,
      setOpponentIsReady,
      setStartEnabled,
      setImage,
      navigate,
      image,
    ]);

    useEffect(() => {
      if (userIsReady) {
        console.log('Sending ready event');
        socket.emit('ready');
      } else {
        console.log('Sending not_ready event');
        socket.emit('not_ready');
      }
    }, [userIsReady]);
  },

  setSetLoadingFunction: function (setLoading) {
    setLoadingFunction = setLoading;
  },

  emitCheckCode: function (code) {
    console.log('Sending code_submit event with code:', code);
    socket.emit('code_submit', code);
  },

  startGame: function () {
    console.log('Sending start_game event');
    socket.emit('start_game');
  },

  checkScore: function (setLoading, CombinedCode) {
    console.log('Sending check_score event');
    setLoading(true);
    socket.emit('check_score', combinedCode);
  },
};
export default socketFunctions;
