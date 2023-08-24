import React from 'react';
import ReactDOM from 'react-dom/client';
import SessionApp from '../SessionApp';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { RealtimeProvider } from '../context/realtimeContext';
import { store } from '../store';
import 'react-toggle/style.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <RealtimeProvider>
        <SessionApp />
      </RealtimeProvider>
    </Provider>
  </HashRouter>
);
