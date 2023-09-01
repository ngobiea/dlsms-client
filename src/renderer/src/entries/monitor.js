import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ExamSessionProvider } from '../context/ExamSessionContext';
import { RealtimeProvider } from '../context/realtimeContext';
import { store } from '../store';
import MonitorApp from '../MonitorApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <RealtimeProvider>
        <ExamSessionProvider>
          <MonitorApp />
        </ExamSessionProvider>
      </RealtimeProvider>
    </Provider>
  </HashRouter>
);
