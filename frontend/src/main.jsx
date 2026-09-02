import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
createRoot(document.getElementById('root')).render(<React.StrictMode><AuthProvider><MarketplaceProvider><App /></MarketplaceProvider></AuthProvider></React.StrictMode>);
