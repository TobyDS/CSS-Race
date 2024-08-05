import { create } from 'zustand';
import editorDefaults from '@data/editorDefaults';

interface StoreState {
  // State
  roomId: string;
  targetImage: string | null;
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

  // Actions
  setRoomId: (roomId: StoreState['roomId']) => void;
  setTargetImage: (targetImage: StoreState['targetImage']) => void;
  setLocalUserReady: (localUserReady: StoreState['localUserReady']) => void;
  setIsHost: (isHost: StoreState['isHost']) => void;
  setOpponentReady: (opponentReady: StoreState['opponentReady']) => void;
  setStartEnabled: (startEnabled: StoreState['startEnabled']) => void;
  setHtmlCode: (htmlCode: StoreState['htmlCode']) => void;
  setCssCode: (cssCode: StoreState['cssCode']) => void;
  setCodeIsSubmitting: (
    codeIsSubmitting: StoreState['codeIsSubmitting']
  ) => void;
  setOpponentCode: (opponentCode: StoreState['opponentCode']) => void;
  setLocalUserBestScore: (
    localUserBestScore: StoreState['localUserBestScore']
  ) => void;
  setOpponentBestScore: (
    opponentBestScore: StoreState['opponentBestScore']
  ) => void;
  setGameOver: (gameOver: StoreState['gameOver']) => void;
  resetState: () => void;
}

const useStore = create<StoreState>()((set) => {
  return {
    // State
    roomId: '',
    targetImage: null,
    localUserReady: false,
    isHost: false,
    opponentReady: undefined,
    startEnabled: false,
    htmlCode: editorDefaults.htmlTemplate,
    cssCode: editorDefaults.cssTemplate,
    combinedCode: `${editorDefaults.htmlTemplate}<style>${editorDefaults.cssTemplate}</style>`,
    codeIsSubmitting: false,
    opponentCode: '',
    localUserBestScore: 0,
    opponentBestScore: 0,
    gameOver: false,

    // Actions
    setRoomId: (roomId) => set({ roomId }),
    setTargetImage: (targetImage) => set({ targetImage }),
    setLocalUserReady: (localUserReady) => set({ localUserReady }),
    setIsHost: (isHost) => set({ isHost }),
    setOpponentReady: (opponentReady) => set({ opponentReady }),
    setStartEnabled: (startEnabled) => set({ startEnabled }),
    setHtmlCode: (htmlCode) => {
      set((state) => {
        const combinedCode = `${htmlCode}<style>${state.cssCode}</style>`;
        return { htmlCode, combinedCode };
      });
    },
    setCssCode: (cssCode) => {
      set((state) => {
        const combinedCode = `${state.htmlCode}<style>${cssCode}</style>`;
        return { cssCode, combinedCode };
      });
    },
    setCodeIsSubmitting: (codeIsSubmitting) => set({ codeIsSubmitting }),
    setOpponentCode: (opponentCode) => set({ opponentCode }),
    setLocalUserBestScore: (localUserBestScore) => set({ localUserBestScore }),
    setOpponentBestScore: (opponentBestScore) => set({ opponentBestScore }),
    setGameOver: (gameOver) => set({ gameOver }),
    resetState: () =>
      set({
        roomId: '',
        targetImage: null,
        localUserReady: false,
        isHost: false,
        opponentReady: undefined,
        startEnabled: false,
        htmlCode: editorDefaults.htmlTemplate,
        cssCode: editorDefaults.cssTemplate,
        combinedCode: `${editorDefaults.htmlTemplate}<style>${editorDefaults.cssTemplate}</style>`,
        codeIsSubmitting: false,
        opponentCode: '',
        localUserBestScore: 0,
        opponentBestScore: 0,
        gameOver: false,
      }),
  };
});

export default useStore;
