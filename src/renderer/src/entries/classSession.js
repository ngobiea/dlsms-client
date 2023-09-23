import React from 'react';
import ReactDOM from 'react-dom/client';
import SessionApp from '../SessionApp';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { RealtimeProvider } from '../context/realtimeContext';
import { ClassSessionProvider } from '../context/ClassSessionContext';
import { store } from '../store';
import 'react-toggle/style.css';
import 'react-datetime/css/react-datetime.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <RealtimeProvider>
        <ClassSessionProvider>
          <SessionApp />
        </ClassSessionProvider>
      </RealtimeProvider>
    </Provider>
  </HashRouter>
);
