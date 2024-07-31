import { create } from 'zustand';
import editorDefaults from '@data/editorDefaults';

const useStore = create((set) => ({
  // State
  roomId: null,
  image: null,
  userReady: false,
  opponentReady: false,
  startEnabled: false,
  htmlCode: editorDefaults.htmlTemplate,
  cssCode: editorDefaults.cssTemplate,
  combinedCode: `${editorDefaults.htmlTemplate}<style>${editorDefaults.cssTemplate}</style>`,
  isSubmitting: false,
  opponentCode: '',
  userBestScore: 0,
  opponentBestScore: 0,
  gameOver: false,

  // Actions
  setRoomId: (roomId) => set({ roomId }),
  setImage: (image) => set({ image }),
  setUserReady: (userReady) => set({ userReady }),
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
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setOpponentCode: (opponentCode) => set({ opponentCode }),
  setUserBestScore: (userBestScore) => set({ userBestScore }),
  setOpponentBestScore: (opponentBestScore) => set({ opponentBestScore }),
  setGameOver: (gameOver) => set({ gameOver }),
}));

export default useStore;
