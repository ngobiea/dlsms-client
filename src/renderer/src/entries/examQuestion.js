import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-datetime/css/react-datetime.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toggle/style.css';

import { ExamSessionProvider } from '../context/ExamSessionContext';
import { RealtimeProvider } from '../context/realtimeContext';
import { store } from '../store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <RealtimeProvider>
        <ExamSessionProvider />
      </RealtimeProvider>
    </Provider>
  </HashRouter>
);
