import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter , HashRouter } from 'react-router-dom';
import { AppProvider } from './data/store/createContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter basename='/'>
  <AppProvider>
    <App />
  </AppProvider>
  </HashRouter>
);
