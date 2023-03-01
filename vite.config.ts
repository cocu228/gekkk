import {defineConfig, loadEnv} from 'vite';
// import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react';
import path from "path";
export default defineConfig(({mode}) => ({
  resolve: {
    alias: [
      {find: '@', replacement: path.resolve(__dirname, 'src')},
      {find: '@public', replacement: path.resolve(__dirname, 'public')},
      {find: /\{\{MODE\}\}/, replacement: mode},
    ],
  },
  cors: true,
  server: {
    proxy: {
      '/api': {
        target: 'https://api-dev.gekkoin.com',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  input: {
    main: path.resolve(__dirname, 'index.html'),
    authorization: path.resolve(__dirname, 'pages/auth/ui/index.html'),
  },
  plugins: [react()]
}))
