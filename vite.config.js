import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Media is already compressed at build time by the asset pipeline; keeping
    // it out of the inline-base64 path keeps the JS bundle small.
    assetsInlineLimit: 2048,
  },
});
