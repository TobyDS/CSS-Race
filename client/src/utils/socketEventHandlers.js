// utils/socketEventHandlers.js
import useStore from '@store/useStore';

const createEventHandlers = (isHost, navigate) => {
  const {
    image,
    setRoomId,
    setOpponentReady,
    setStartEnabled,
    setImage,
    setUserBestScore,
    setIsSubmitting,
    setOpponentCode,
    setOpponentBestScore,
    setAnnounceWinner,
  } = useStore.getState();

  return {
    room_id: setRoomId,
    opponent_status: setOpponentReady,
    opponent_ready: () => setOpponentReady(true),
    opponent_not_ready: () => setOpponentReady(false),
    all_ready: () => setStartEnabled(true),
    not_all_ready: () => setStartEnabled(false),
    image: setImage,
    start_game: () => {
      const playerNumber = isHost ? 1 : 2;
      navigate('/battle', { state: { image: image, playerNumber } });
    },
    user_score: (score) => {
      setIsSubmitting(false);
      setUserBestScore((prev) => Math.max(prev, score));
    },
    opponent_score: (score) => {
      setOpponentBestScore((prev) => Math.max(prev, score));
    },
    code_update: setOpponentCode,
    game_over: () => setAnnounceWinner(true),
  };
};

export default createEventHandlers;
