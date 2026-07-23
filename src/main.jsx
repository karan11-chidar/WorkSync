import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/app/App'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster position="top-center" richColors closeButton />
  </BrowserRouter>
);
