import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig(({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd() + "/env")
  };

  const isGekkoin = mode === "dev.gekkoin";

  return {
    base: "./",
    build: {
      outDir: isGekkoin ? "gko-dist" : "dist",
      rollupOptions: {
        input: {
          authentication: resolve(__dirname, "./src/index.tsx")
        },
        output: {
          entryFileNames: `[name].js`
        }
      }
    },
    plugins: [preact(), cssInjectedByJsPlugin()]
  };
});
