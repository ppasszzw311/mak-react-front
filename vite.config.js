import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'msw',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/mockServiceWorker.js') {
            try {
              const mockServiceWorkerPath = path.resolve(__dirname, 'node_modules/msw/lib/mockServiceWorker.js')
              const content = fs.readFileSync(mockServiceWorkerPath, 'utf-8')
              res.writeHead(200, {
                'Content-Type': 'application/javascript',
                'Content-Length': Buffer.byteLength(content)
              })
              res.end(content)
              return
            } catch (error) {
              console.error('Error serving mockServiceWorker.js:', error)
            }
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
