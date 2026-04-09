import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'petite-badgers-repeat.loca.lt' // El dominio que te dio el túnel
    ]
  }
})
