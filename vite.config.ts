import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), svgr(), tailwindcss()],
    svgr: {
      svgrOptions: {
        icon: true,
        expandProps: 'end'
      }
    },
    server: {
      port: 3000,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@ui': path.resolve(__dirname, 'src/ui'),
        '@app': path.resolve(__dirname, 'src/app'),
        '@i18n': path.resolve(__dirname, 'src/i18n'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@composable': path.resolve(__dirname, 'src/composable')
      }
    }
  }
})
