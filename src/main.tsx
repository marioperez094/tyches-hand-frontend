import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";

import "./index.css";
import "./styles/globals.scss";


import { LoadingProvider } from './context/loading';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoadingProvider>
  </StrictMode>,
)
