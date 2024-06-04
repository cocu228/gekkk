import {defineConfig, loadEnv} from 'vite';
import {createHtmlPlugin} from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import path from "path";
import svgr from 'vite-plugin-svgr';
import {nodePolyfills} from 'vite-plugin-node-polyfills'
import {copy} from 'vite-plugin-copy';

export default defineConfig(({mode}) => {
    const getVersion = (appType: string | undefined) => {
        return JSON.stringify(require('./package.json')[`${appType?.toLowerCase()}-version`])
    }

    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd() + "/env"),
        VITE_APP_VERSION: getVersion(process.env.APP_TYPE),
        VITE_APP_TYPE: process.env.APP_TYPE,
    };

    const isGekkoin = process.env.APP_TYPE === "GEKKOIN";
    const isGekwallet = process.env.APP_TYPE === "GEKWALLET";

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
                        return url
                            .replace(/\{\{MODE\}\}/, isGekkoin ? "GKO" : "")
                            .replace(/\{\{mode-\}\}/, isGekkoin ? "gko-" : "")
                            .replace(/\{\{mode\}\}/, isGekkoin ? "gko" : "")
                            .replace(/\{\{MODE-\}\}/, isGekkoin ? "GKO-" : "")
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
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: isGekwallet ?
                            "Gekwallet" : isGekkoin ?
                                "Gekkoin" : "Gekkard",
                    },
                },
            }),
            svgr(),
            copy([{
                src: isGekkoin
                    ? './public/manifests/gekkoin/site.webmanifest'
                    : isGekwallet
                        ? './public/manifests/gekwallet/site.webmanifest'
                        : './public/manifests/gekkard/site.webmanifest',
                dest: './public/',
            }]),
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
