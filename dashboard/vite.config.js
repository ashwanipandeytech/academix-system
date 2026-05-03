import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        students: resolve(__dirname, 'students.html'),
        teachers: resolve(__dirname, 'teachers.html'),
        fees: resolve(__dirname, 'fees.html'),
        exams: resolve(__dirname, 'exams.html'),
        library: resolve(__dirname, 'library.html'),
        settings: resolve(__dirname, 'settings.html'),
      },
    },
  },
});
