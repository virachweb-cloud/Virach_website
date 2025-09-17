import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // use @/ for src folder
    },
  },
  build: {
    outDir: "dist", // Vercel expects build output in "dist"
    emptyOutDir: true, // clean old files before new build
  },
  server: {
    port: 5173, // default Vite port, change if needed
    open: true, // auto-open browser on "npm run dev"
  },
});
