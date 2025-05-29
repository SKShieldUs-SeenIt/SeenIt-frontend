// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : (
        <Routes key="main">
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={
            <div style={{ padding: '20px' }}>
              <h2>🚫 페이지를 찾을 수 없습니다</h2>
            </div>
          } />
        </Routes>
      )}
    </AnimatePresence>
  );
}
