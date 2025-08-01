import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@onboarding": path.resolve(__dirname, "./src/onboarding"),
        "@appointment": path.resolve(__dirname, "./src/appointment"),
        "@welcome": path.resolve(__dirname, "./src/welcome"),
        "@core": path.resolve(__dirname, "./src/core"),
        "@bus": path.resolve(__dirname, "./src/bus"),
        "@platform": path.resolve(__dirname, "./src/platform"),
        "@commercial": path.resolve(__dirname, "./src/commercial"),
      },
    },
    define: {
      "process.env": {
        MODE: JSON.stringify(mode),
        API_URL: JSON.stringify(process.env.API_URL),
      },
    },
    build: {
      outDir: mode === "production" ? "dist" : "build",
    }
  };
});


