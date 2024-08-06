import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import editorDefaults from '@data/editorDefaults';

const useStore = create((set) => {
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

if (import.meta.env.MODE === 'development') {
  mountStoreDevtool('Store', useStore);
}

export default useStore;
