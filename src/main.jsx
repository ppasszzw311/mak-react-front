import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@/assets/stylesheet/main.css'

// 在開發環境中啟用 Mock API
if (import.meta.env.DEV) {
  const initMocks = async () => {
    const { worker } = await import('./mocks/browser.js')
    await worker.start({
      onUnhandledRequest: 'bypass'
    })
  }
  initMocks()
}

createRoot(document.getElementById('root')).render(
    <App />,
)
