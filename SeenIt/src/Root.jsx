// src/Root.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './App';

// 빈 reducer: 아직 slice 없음
const store = configureStore({
  reducer: {} // 나중에 movie, review 등 slice 추가 예정
});

export default function Root() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
