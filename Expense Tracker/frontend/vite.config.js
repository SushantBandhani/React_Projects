import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"; // ✅ Import path (required)


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
  // plugins: [react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
