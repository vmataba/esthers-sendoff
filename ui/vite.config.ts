import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/esthers-sendoff/',
    server: {
        proxy: {
            // '/api': 'http://localhost:9085'
            '/api': 'http://146.19.133.201:8080'
        }
    }
})
