import {defineConfig} from 'vite';
import {resolve} from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
    base: "./",
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
    },
    resolve: {
        alias: [
            {find: 'react', replacement: 'preact/compat'},
            {find: 'react-dom', replacement: 'preact/compat'}
        ]
    },
    build: {
        rollupOptions: {
            input: {
                chat: resolve(__dirname, './src/main.tsx'),
            },
            output: {
                entryFileNames: `[name].js`,
            }
        },
    },
    plugins: [cssInjectedByJsPlugin(), ],
    // plugins: [],
})
