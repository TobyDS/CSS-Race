import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { mountStoreDevtool } from 'simple-zustand-devtools';
import editorDefaults from '@data/editorDefaults';

const useGameStore = create<GameStore>()(
  devtools(
    (set) => ({
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
      setLocalUserReady: (isReady) => set({ localUserReady: isReady }),
      setIsHost: (isHost) => set({ isHost }),
      setOpponentReady: (isReady) => set({ opponentReady: isReady }),
      setStartEnabled: (isEnabled) => set({ startEnabled: isEnabled }),
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
      setLocalUserBestScore: (localUserBestScore) =>
        set({ localUserBestScore }),
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
    }),
    {
      name: 'GameStore',
      trace: true,
    }
  )
);

if (import.meta.env.MODE === 'development') {
  mountStoreDevtool('GameStore', useGameStore);
}

export default useGameStore;
