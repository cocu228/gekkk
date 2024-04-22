import {defineConfig, loadEnv} from 'vite';
// import {VitePWA} from 'vite-plugin-pwa'
// import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react';
import path from "path";
import svgr from 'vite-plugin-svgr';
// import {splitVendorChunkPlugin} from 'vite'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineConfig(({mode}) => {

    const type  = (mode === "GKO-DEV" || mode === "GKO-DEV") ? "GKO" : ""

    process.env = {
        ...process.env, ...loadEnv(mode, process.cwd()),
        VITE_APP_VERSION: JSON.stringify(require('./package.json').version)
    };
    return {
        // base: '',
        resolve: {
            alias: [
                {find: '@', replacement: path.resolve(__dirname, 'src')},
                {find: '@public', replacement: path.resolve(__dirname, 'public')},
                {find: '@styles', replacement: path.resolve(__dirname, 'src/app/styles')},
                {
                    find: "@VAR", replacement: path.resolve(__dirname, 'src'),
                    customResolver(url) {
                        return url.replace(/\{\{MODE\}\}/, mode === "GKO" ? "GKO" : "")
                            .replace(/\{\{mode-\}\}/, mode === "GKO" ? "gko-" : "")
                            .replace(/\{\{MODE-\}\}/, mode === "GKO" ? "GKO-" : "")
                    }
                },
            ],
        },
        build: {
            target: 'modules',
            rollupOptions: {
                input: ["index.html"]
            }
        },
        server: {
            // proxy: {
            // '^/(api|gek|auth|pub/)': {
            //     target: 'https://gate-dev.gekkard.com:6789/',
            //     changeOrigin: true,
            //     secure: false,
            // }
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
            // }
        },
        plugins: [react(),
            // splitVendorChunkPlugin(),
            svgr(),
            // VitePWA({
            //     registerType: 'autoUpdate',
            //     // includeAssets: ['**/*'],
            //     workbox: {
            //         maximumFileSizeToCacheInBytes: 20000000,
            //         // globPatterns: ['**/*'],
            //         globPatterns: ['**/*.{js,css,html,json,webmanifest}'],
            //         // runtimeCaching: [
            //         //     {
            //         //         urlPattern: ({url}) => {
            //         //             // console.log(url)
            //         //             // return !!url.pathname.startsWith("/")
            //         //         },
            //         //         handler: "StaleWhileRevalidate",
            //         //         options: {
            //         //             cacheName: "MyCache"
            //         //         }
            //         //     }
            //         // ]
            //     },
            //     devOptions: {
            //         enabled: true
            //     }
            // })
            nodePolyfills({
                globals: {
                    Buffer: true, // can also be 'build', 'dev', or false
                    global: true,
                    process: true,
                }
            }),
        ],

    }
})
