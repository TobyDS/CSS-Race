import useGameStore from '@store/useGameStore';
import type { NavigateFunction } from 'react-router-dom';

/**
 * Creates event handlers for socket.io messages.
 *
 * This function defines a set of event handlers that will be triggered based on the received socket.io messages.
 * Each handler updates the application state using Zustand's state management.
 *
 * @param {NavigateFunction} navigate - A function to navigate to different routes in the application.
 * @returns An object containing the event handlers for various socket.io messages.
 */
const createEventHandlers = (navigate: NavigateFunction) => {
  const {
    localUserBestScore,
    opponentBestScore,
    setRoomId,
    setOpponentReady,
    setStartEnabled,
    setTargetImage,
    setLocalUserBestScore,
    setCodeIsSubmitting,
    setOpponentCode,
    setOpponentBestScore,
    setGameOver,
  } = useGameStore.getState();

  return {
    room_id: setRoomId,
    opponent_status: setOpponentReady,
    opponent_ready: () => setOpponentReady(true),
    opponent_not_ready: () => setOpponentReady(false),
    all_ready: () => setStartEnabled(true),
    not_all_ready: () => setStartEnabled(false),
    image: setTargetImage,
    start_game: () => {
      navigate('/battle');
    },
    user_score: async (score: number) => {
      const newScore = Math.max(localUserBestScore, score);
      setLocalUserBestScore(newScore);
      setCodeIsSubmitting(false);
    },
    opponent_score: async (score: number) => {
      const newScore = Math.max(opponentBestScore, score);
      setOpponentBestScore(newScore);
    },
    code_update: setOpponentCode,
    game_over: () => setGameOver(true),
  };
};

export default createEventHandlers;
