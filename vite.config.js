import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Listen on IPv4 and point the HMR websocket at the same address.
    // Without this the server bound only to IPv6 (::1) while the browser's
    // websocket tried 127.0.0.1, so live-reload failed to connect.
    host: '127.0.0.1',
    port: 5173,
    hmr: { host: '127.0.0.1' },
  },
})
