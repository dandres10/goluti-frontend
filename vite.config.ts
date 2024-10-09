import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@bus": path.resolve(__dirname, "./src/bus"),
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


