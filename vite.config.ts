import {defineConfig, loadEnv} from 'vite';
// import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react';
import path from "path";
export default defineConfig(({mode}) => {

  process.env = {
    ...process.env, ...loadEnv(mode, process.cwd()),
    VITE_APP_VERSION: JSON.stringify(require('./package.json').version)
  };

  console.log(process.env)

  return {
    resolve: {
      alias: [
        {find: '@', replacement: path.resolve(__dirname, 'src')},
        {find: '@public', replacement: path.resolve(__dirname, 'public')},
        {find: '@styles', replacement: path.resolve(__dirname, 'src/app/styles')},
        {find: /\{\{MODE\}\}/, replacement: mode},
      ],
    },
    server: {
      proxy: {
        '^/(api|gek|pub/)': {
          target: 'https://api-dev.gekkoin.com',
          changeOrigin: true,
          secure: false,
        },
        // '^/TEMP-API': {
        //   target: 'http://10.7.14.10/pub/v1/auth',
        //   changeOrigin: true,
        //   secure: false,
        //   rewrite: (path) => path.replace(/^\/TEMP-API/, ''),
        //   configure: (proxy, _options) => {
        //     proxy.on('error', (err, _req, _res) => {
        //       console.log('proxy error', err);
        //     });
        //     proxy.on('proxyReq', (proxyReq, req, _res) => {
        //       console.log(1)
        //       console.log('Sending Request to the Target:', req.method, req.url);
        //     });
        //     proxy.on('proxyRes', (proxyRes, req, _res) => {
        //       console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        //     });
        //   },
        // },
      }
    },
    plugins: [react()]
  }
})
