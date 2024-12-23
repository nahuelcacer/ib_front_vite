import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://interges-back-git-master-nahuel-caceres-projects.vercel.app',
//         changeOrigin: true,
//         secure: false
//       }
//     }
//   }
// })
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://interges-back.vercel.app',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
