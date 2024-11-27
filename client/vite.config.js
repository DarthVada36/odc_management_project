import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['./node_modules'], // Para que encuentre Boosted y Bootstrap
      },
    },
  },
});
