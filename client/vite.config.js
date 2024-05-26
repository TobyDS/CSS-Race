import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.js'],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '/src/components'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@data': path.resolve(__dirname, '/src/data'),
      '@utils': path.resolve(__dirname, '/src/utils'),
      '@styles': path.resolve(__dirname, '/src/assets/styles'),
      '@images': path.resolve(__dirname, '/src/assets/images'),
    },
  },
});
