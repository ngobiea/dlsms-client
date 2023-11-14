import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-datetime/css/react-datetime.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-toggle/style.css';

import { RealtimeProvider } from '../context/realtimeContext';
import { TutorProvider } from '../context/TutorContext';
import { store } from '../store';

import TutorSessionApp from '../TutorSessionApp';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <RealtimeProvider>
        <TutorProvider>
          <TutorSessionApp />
        </TutorProvider>
      </RealtimeProvider>
    </Provider>
  </HashRouter>
);
