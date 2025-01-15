import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';
import './index.css';
import StoreProvider from './store/storeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
