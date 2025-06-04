import { defineConfig } from "vite"; // ¡Esta línea es crucial!
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/github-config": {
        target: "https://raw.githubusercontent.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/github-config/,
            "/Elmer-ing/data_config_center_foragend/main"
          ),
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: "./index.html",
        sw: "./public/sw.js",
      },
    },
  },
});
