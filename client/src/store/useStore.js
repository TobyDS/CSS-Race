import { create } from 'zustand';
import editorDefaults from '@data/editorDefaults';

const useStore = create((set) => ({
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
  userBestScore: 0,
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
}));

export default useStore;
