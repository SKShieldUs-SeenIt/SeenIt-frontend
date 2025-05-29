// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import { Provider } from 'react-redux';
import { store } from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
-   <Provider store={store}>
    <Root />
-   </Provider>
  </React.StrictMode>
);
