import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  base: '/habit-spark/',  // ← ADD THIS for GitHub Pages
  plugins: [react()],     // ← REMOVED lovable-tagger
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

