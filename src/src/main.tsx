import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import { ErrorBoundary } from '../components/ErrorBoundary';
import '../styles/globals.css';

// Service Worker registrieren
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      console.log('Service Worker registration failed');
    });
  });
}

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
} else {
  console.error('Root element not found!');
}