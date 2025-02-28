import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      "/api": {
        target: "https://admin-pannel-nine-pi.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
