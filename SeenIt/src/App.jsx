// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';
import About from './pages/About';

export default function App() {
  return (
    <div>
      {/* 상단 네비게이션 */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '10px' }}>홈</Link>
        <Link to="/about">소개</Link>
      </nav>

      {/* 실제 페이지가 바뀌는 영역 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />

        {/* 잘못된 경로일 때 보여줄 fallback */}
        <Route path="*" element={
          <div style={{ padding: '20px' }}>
            <h2>페이지를 찾을 수 없습니다 🥲</h2>
          </div>
        } />
      </Routes>
    </div>
  );
}
