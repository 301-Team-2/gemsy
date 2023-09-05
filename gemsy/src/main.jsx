import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

// import your domain and clientID from your environment
let AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID;
let AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="http://dev-adg0wu6cezk1l4ca.us.auth0.com/"
      clientId="9JQkLUJf7mMVe8mRaEyoEVxHH9nUrljA"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
