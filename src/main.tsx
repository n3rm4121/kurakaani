import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { PostProvider } from './contexts/postContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostProvider>
      <App />
      <Toaster />
    </PostProvider>
  </StrictMode>,
)
