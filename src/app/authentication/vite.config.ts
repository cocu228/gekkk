import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import {resolve} from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                authentication: resolve(__dirname, './src/index.tsx'),
            },
            output: {
                entryFileNames: `[name].js`,
            }
        },
    },
    plugins: [preact(), cssInjectedByJsPlugin()],
})
