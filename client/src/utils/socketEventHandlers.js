import useStore from '@store/useStore';

const createEventHandlers = (navigate) => {
  const {
    targetImage,
    isHost,
    setRoomId,
    setOpponentReady,
    setStartEnabled,
    setTargetImage,
    setLocalUserBestScore,
    setCodeIsSubmitting,
    setOpponentCode,
    setOpponentBestScore,
    setGameOver,
  } = useStore.getState();

  return {
    room_id: setRoomId,
    opponent_status: setOpponentReady,
    opponent_ready: () => setOpponentReady(true),
    opponent_not_ready: () => setOpponentReady(false),
    all_ready: () => setStartEnabled(true),
    not_all_ready: () => setStartEnabled(false),
    targetImage: setTargetImage,
    start_game: () => {
      const playerNumber = isHost ? 1 : 2;
      navigate('/battle', { state: { image: targetImage, playerNumber } });
    },
    user_score: (score) => {
      setCodeIsSubmitting(false);
      setLocalUserBestScore((prev) => Math.max(prev, score));
    },
    opponent_score: (score) => {
      setOpponentBestScore((prev) => Math.max(prev, score));
    },
    code_update: setOpponentCode,
    game_over: () => setGameOver(true),
  };
};

export default createEventHandlers;
