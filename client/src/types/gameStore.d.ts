interface TargetImage {
  img: string;
  img_2x?: string;
  colors: string[];
  id: string;
}

interface GameStore {
  roomId: string;
  targetImage: TargetImage | null;
  localUserReady: boolean;
  isHost: boolean;
  opponentReady: boolean | undefined;
  startEnabled: boolean;
  htmlCode: string;
  cssCode: string;
  combinedCode: string;
  codeIsSubmitting: boolean;
  opponentCode: string;
  localUserBestScore: number;
  opponentBestScore: number;
  gameOver: boolean;

  setRoomId: (roomId: GameStore['roomId']) => void;
  setTargetImage: (targetImage: GameStore['targetImage']) => void;
  setLocalUserReady: (localUserReady: GameStore['localUserReady']) => void;
  setIsHost: (isHost: GameStore['isHost']) => void;
  setOpponentReady: (opponentReady: GameStore['opponentReady']) => void;
  setStartEnabled: (startEnabled: GameStore['startEnabled']) => void;
  setHtmlCode: (htmlCode: GameStore['htmlCode']) => void;
  setCssCode: (cssCode: GameStore['cssCode']) => void;
  setCodeIsSubmitting: (
    codeIsSubmitting: GameStore['codeIsSubmitting']
  ) => void;
  setOpponentCode: (opponentCode: GameStore['opponentCode']) => void;
  setLocalUserBestScore: (
    localUserBestScore: GameStore['localUserBestScore']
  ) => void;
  setOpponentBestScore: (
    opponentBestScore: GameStore['opponentBestScore']
  ) => void;
  setGameOver: (gameOver: GameStore['gameOver']) => void;
  resetState: () => void;
}
