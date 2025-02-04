import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['2b06-103-161-31-4.ngrok-free.app', 'localhost', 'your-other-allowed-hosts']
  }
})
