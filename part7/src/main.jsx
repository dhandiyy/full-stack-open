import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,

  }}>
    <App />
  </Router>,
)
