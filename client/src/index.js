import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import { SideSelectionProvider } from './contexts/SideSelectionContext';
import { EntreeSelectionProvider } from './contexts/EntreeSelectionContext';
import { ReceiptProvider } from './contexts/ReceiptContext';

const domain = "dev-nuy1lg25ualtdtoz.us.auth0.com";
const clientId = "xBecRztqUAWVooJV7sIfNz2OASl9jOEW";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <SideSelectionProvider>
        <EntreeSelectionProvider>
          <ReceiptProvider> 
            <App />
          </ReceiptProvider>
        </EntreeSelectionProvider>
      </SideSelectionProvider>
    </Auth0Provider>
  </React.StrictMode>
);
