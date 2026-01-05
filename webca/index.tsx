import React from 'react';
import ReactDOM from 'react-dom/client';
import { ServiceDetail } from '../components/ServiceDetail';
import { LanguageToggle } from '../components/LanguageToggle';
import { LanguageProvider } from '../contexts/LanguageContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <div className="min-h-screen bg-[#020403] text-[#e4e7e5]">
        <div className="fixed top-6 right-6 z-50">
          <LanguageToggle />
        </div>
        <ServiceDetail onBack={() => window.location.assign('/')} />
      </div>
    </LanguageProvider>
  </React.StrictMode>
);

