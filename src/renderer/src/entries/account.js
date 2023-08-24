import React from 'react';
import ReactDOM from 'react-dom/client';
import AccountApp from '../AccountApp';
import { HashRouter } from 'react-router-dom';
import { store } from '../store';
import { Provider } from 'react-redux';
import { AccountProvider } from '../context/accountContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Provider store={store}>
      <AccountProvider>
        <AccountApp />
      </AccountProvider>
    </Provider>
  </HashRouter>
);
