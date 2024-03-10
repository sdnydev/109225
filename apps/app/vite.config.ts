import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: path.resolve(import.meta.dirname, '..', '..'),
  plugins: [react()],
});
