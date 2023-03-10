import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import CreateComponentPlugin from './CreateComponentPlugin.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), CreateComponentPlugin()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    lib: {
      entry: 'index.html',
      formats: ['es'],
    },
  },
});
