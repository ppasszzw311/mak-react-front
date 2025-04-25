import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'msw',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/mockServiceWorker.js') {
            res.setHeader('Content-Type', 'application/javascript')
          }
          next()
        })
      }
    }
  ],
  // 配置路由
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
})
