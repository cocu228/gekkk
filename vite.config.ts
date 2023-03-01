import {defineConfig, loadEnv} from 'vite';
// import tailwindcss from 'tailwindcss'
// import react from '@vitejs/plugin-react';
import path from "path";

const root = path.resolve(__dirname, 'src');

export default defineConfig(({mode}) => ({
  root,
  resolve: {
    alias: [
      {find: '@', replacement: path.resolve(__dirname, 'src')},
      {find: '@public', replacement: path.resolve(__dirname, 'public')},
      {find: /\{\{MODE\}\}/, replacement: mode},
    ],
  },
  input: {
    main: path.resolve(__dirname, 'index.html'),
    authorization: path.resolve(__dirname, 'pages/auth/ui/index.html'),
  }
}))
