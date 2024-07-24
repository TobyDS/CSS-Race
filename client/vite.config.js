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
      '@components': new URL('/src/components', import.meta.url).pathname,
      '@pages': new URL('/src/pages', import.meta.url).pathname,
      '@services': new URL('/src/services', import.meta.url).pathname,
      '@data': new URL('/src/data', import.meta.url).pathname,
      '@utils': new URL('/src/utils', import.meta.url).pathname,
      '@styles': new URL('/src/assets/styles', import.meta.url).pathname,
      '@images': new URL('/src/assets/images', import.meta.url).pathname,
    },
  },
});
