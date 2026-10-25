import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './themes/iskandar.css'

// Theme preview: ?theme=iskandar switches it on (remembered), ?theme=default switches it off.
const requested = new URLSearchParams(window.location.search).get('theme')
try {
  if (requested) localStorage.setItem('theme', requested)
  const theme = requested ?? localStorage.getItem('theme')
  if (theme && theme !== 'default') document.documentElement.dataset.theme = theme
} catch {
  if (requested && requested !== 'default') document.documentElement.dataset.theme = requested
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)