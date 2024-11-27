import 'boosted/scss/boosted.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importamos el archivo principal de estilos que contiene las variables y Bootstrap
import './styles/main.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
