// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import HomePage from './pages/HomePage';
import SplashScreen from './components/splash/SplashScreen';
import './App.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* 존재하지 않는 경로 */}
          <Route path="*" element={
            <div style={{ padding: '20px' }}>
              <h2>🚫 페이지를 찾을 수 없습니다</h2>
            </div>
          } />
        </Routes>
      )}
    </div>
  );
}
