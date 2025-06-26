
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Add Google Fonts preconnect for performance
const linkPreconnect = document.createElement('link');
linkPreconnect.rel = 'preconnect';
linkPreconnect.href = 'https://fonts.googleapis.com';
document.head.appendChild(linkPreconnect);

const linkPreconnectGstatic = document.createElement('link');
linkPreconnectGstatic.rel = 'preconnect';
linkPreconnectGstatic.href = 'https://fonts.gstatic.com';
linkPreconnectGstatic.crossOrigin = 'anonymous';
document.head.appendChild(linkPreconnectGstatic);

// Add Google Fonts stylesheet
const linkFonts = document.createElement('link');
linkFonts.rel = 'stylesheet';
linkFonts.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Lexend:wght@300;400;500;600;700&display=swap';
document.head.appendChild(linkFonts);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
