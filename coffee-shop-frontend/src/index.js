import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {store} from './store';
import {Provider} from 'react-redux'
import {api} from './services/apiService';


api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
