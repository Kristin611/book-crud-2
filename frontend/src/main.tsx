// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)

//got ride of <StrictMode></StrictMode> around <App/> bc it doubles the console: look up strictmode react
