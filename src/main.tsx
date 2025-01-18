import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';
import StoreProvider from './store/storeContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
