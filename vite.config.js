import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 配置路由
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  // 配置代理
  server: {
    proxy: {
      '/api': {
        target: 'https://mak-net.zeabur.app',//'https://mak-net.zeabur.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
})
