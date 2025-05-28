// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div>


      {/* 라우팅 영역 */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* 존재하지 않는 경로 */}
        <Route path="*" element={
          <div style={{ padding: '20px' }}>
            <h2>🚫 페이지를 찾을 수 없습니다</h2>
          </div>
        } />
      </Routes>
    </div>
  );
}
