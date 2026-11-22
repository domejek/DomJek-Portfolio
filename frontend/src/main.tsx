import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Scroll-Animationen gibt es nur mit JS. Das Prerender-Skript entfernt die
// Klasse vor dem Serialisieren, damit das statische HTML vollständig lesbar ist.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
