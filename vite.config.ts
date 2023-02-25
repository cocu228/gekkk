import {defineConfig, loadEnv} from 'vite';
// import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react';
import path from "path";

// https://vitejs.dev/config/
export default ({mode, command}) => {

  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  console.log(import.meta.url)
  return defineConfig({
    plugins: [react()],
    envPrefix: 'GEKKOIN_REACT',
    resolve: {
      alias: [
        {find: '@', replacement: path.resolve(__dirname, 'src')},
        {find: '@public', replacement: path.resolve(__dirname, 'public')},
        {find: /\{\{MODE\}\}/, replacement: mode},
      ],
    }
  })
}
