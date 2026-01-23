import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite"; // Add this
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(), // Add this before reactRouter()
    reactRouter(), 
    tsconfigPaths()
  ],
});