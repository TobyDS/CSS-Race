import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

const socket = io(SOCKET_SERVER_URL);

let setLoadingFunction = null;
let setUserLatestScoreFunction = null;
let setUserBestScoreFunction = null;
let setOpponentCodeFunction = null;
let setOpponentLatestScoreFunction = null;
let setOpponentBestScoreFunction = null;
let setAnnounceWinnerFunction = null;

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
        socket.emit('create_room');
      }
    }, [isHost]);

    useEffect(() => {
      if (!isHost) {
        setRoomId(retrievedRoomId);
        socket.emit('join_room', retrievedRoomId);
      }
    }, [isHost, retrievedRoomId, setRoomId]);

    useEffect(() => {
      socket.on('connect', () => {});

      socket.on('connect_error', (error) => {
        console.error('Error connecting:', error);
      });

      socket.on('error', (error) => {
        console.error('Error:', error);
      });

      socket.on('room_id', (retRoomId) => {
        setRoomId(retRoomId);
      });

      socket.on('opponent_status', (isReady) => {
        setOpponentIsReady(isReady);
      });

      socket.on('opponent_ready', () => {
        setOpponentIsReady(true);
      });

      socket.on('opponent_not_ready', () => {
        setOpponentIsReady(false);
      });

      socket.on('all_ready', () => {
        setStartEnabled(true);
      });

      socket.on('not_all_ready', () => {
        setStartEnabled(false);
      });

      socket.on('image', (image) => {
        setImage(image);
      });

      socket.on('start_game', () => {
        let playerNumber = isHost ? 1 : 2;
        navigate('/battle', { state: { image: image, playerNumber } });
      });

      socket.on('user_score', async (score) => {
        if (setLoadingFunction) {
          setLoadingFunction(false);
        }
        if (setUserLatestScoreFunction) {
          setUserLatestScoreFunction(score);
        }
        if (setUserBestScoreFunction) {
          setUserBestScoreFunction((prev) => Math.max(prev, score));
        }
      });

      socket.on('opponent_score', async (score) => {
        if (setOpponentLatestScoreFunction) {
          setOpponentLatestScoreFunction(score);
        }
        if (setOpponentBestScoreFunction) {
          setOpponentBestScoreFunction((prev) => Math.max(prev, score));
        }
      });

      socket.on('code_update', (code) => {
        setOpponentCodeFunction(code);
      });

      socket.on('game_over', () => {
        setAnnounceWinnerFunction(true);
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
      isHost,
    ]);

    useEffect(() => {
      if (userIsReady) {
        socket.emit('ready');
      } else {
        socket.emit('not_ready');
      }
    }, [userIsReady]);
  },

  setSetLoadingFunction: function (setLoading) {
    setLoadingFunction = setLoading;
  },

  setSetUserBestScoreFunction: function (setUserBestScore) {
    setUserBestScoreFunction = setUserBestScore;
  },

  setSetUserLatestScoreFunction: function (setUserPrevScore) {
    setUserLatestScoreFunction = setUserPrevScore;
  },

  setSetOpponentBestScoreFunction: function (setOpponentBestScore) {
    setOpponentBestScoreFunction = setOpponentBestScore;
  },

  setSetOpponentLatestScoreFunction: function (setOpponentPrevScore) {
    setOpponentLatestScoreFunction = setOpponentPrevScore;
  },

  setSetOpponentCodeFunction: function (setOpponentCode) {
    setOpponentCodeFunction = setOpponentCode;
  },

  setSetAnnounceWinnerFunction: function (setAnnounceWinner) {
    setAnnounceWinnerFunction = setAnnounceWinner;
  },

  emitCheckCode: function (code) {
    socket.emit('code_submit', code);
  },

  startGame: function () {
    socket.emit('start_game');
  },

  emitCodeUpdate: function (code) {
    socket.emit('code_update', code);
  },
};
export default socketFunctions;
