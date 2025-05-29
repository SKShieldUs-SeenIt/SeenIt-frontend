// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root';
import './index.css'; // 전역 CSS (Tailwind 또는 초기화 CSS)
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
