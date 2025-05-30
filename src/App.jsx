// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ReviewPage from './pages/ReviewPage';
import PostPage from './pages/PostPage';
import WritePostPage from './pages/WritePostPage';
import PostDetailPage from './pages/PostDetailPage';
import SplashScreen from './components/splash/SplashScreen';
import AllMoviesPage from './pages/AllMoviesPage';
import MySeenMoviePage from './pages/MySeenMoviePage'

import './App.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './pages/MySeenMoviePage.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : (
        <Routes location={location} key={location.pathname}>
          {/* HomePage (기존 애니메이션 유지) */}
          <Route path="/" element={<HomePage />} />

          {/* View All: 오른쪽에서 왼쪽으로 슬라이드 등장 */}
          <Route
            path="/all-movies"
            element={
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                // exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <AllMoviesPage />
              </motion.div>
            }
          />
        <Route
            path="/My-movies"
            element={
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                // exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <MySeenMoviePage />
              </motion.div>
            }
          />
          {/* 나머지는 기본 */}
          <Route path="/details" element={<DetailPage />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/writePosts" element={<WritePostPage />} />
          <Route path="/postDetails" element={<PostDetailPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ padding: '20px' }}>
                  <h2>🚫 페이지를 찾을 수 없습니다</h2>
                </div>
              </motion.div>
            }
          />
        </Routes>
      )}
    </AnimatePresence>
  );
}
