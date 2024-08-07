import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
  },
  plugins: [
    tsconfigPaths(),
    react(),
    sentryVitePlugin({
      org: 'toby-dixon-smith',
      project: 'css-race',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
  },
  build: {
    sourcemap: true,

    rollupOptions: {
      output: {
        manualChunks: {
          '@mui/material': ['@mui/material'],
          '@mui/styled-engine-sc': ['@mui/styled-engine-sc'],
        },
      },
      onwarn (warning, defaultHandler) {
        if (warning.code === 'SOURCEMAP_ERROR') {
          return;
        }

        defaultHandler(warning);
      },
    },
  },
});
