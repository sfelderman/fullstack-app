import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './components/App';
import * as serviceWorker from './serviceWorker';
import AppRouter from './AppRouter';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='plaid-fullstack.us.auth0.com'
      clientId='EfY45TSGV6iZeF7ThFCKh3vN2RIHsdLL'
      redirectUri={window.location.origin}
      audience='https://plaid-fullstack.us.auth0.com/api/v2/'
      scope='read:current_user update:current_user_metadata'>
      <AppRouter />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
