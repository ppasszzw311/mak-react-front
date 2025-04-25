import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@/assets/stylesheet/main.css'

// 在開發環境中啟用 Mock API
if (import.meta.env.DEV) {
  import('./mocks/browser.js').then(({ worker }) => {
    worker.start()
  })
}

createRoot(document.getElementById('root')).render(
    <App />,
)
