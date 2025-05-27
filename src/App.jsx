// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div>
      {/* 네비게이션 바 */}
      <nav style={{ padding: '12px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>홈</Link>
      </nav>

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
