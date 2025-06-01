import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './components/splash/SplashScreen';
import SocialLoginPage from './pages/SocialLoginPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ReviewPage from './pages/ReviewPage';
import PostPage from './pages/PostPage';
import WritePostPage from './pages/WritePostPage';
import PostDetailPage from './pages/PostDetailPage';
import AllMoviesPage from './pages/AllMoviesPage';
import MySeenMoviePage from './pages/MySeenMoviePage';
import ScrollToTop from './components/common/ScrollToTop';
import SignupIDPage from './pages/SignupIdPage';
import SignupSplashScreen from './components/splash/SignupSplashScreen';
import SignupGenrePage from './pages/SignupGenrePage';

import './App.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './pages/MySeenMoviePage.css';

export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
        if (location.pathname === '/') {
          navigate('/login');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash, location, navigate]);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : (
        <Routes location={location} key={location.pathname}>
          {/* 로그인 및 회원가입 흐름 */}
          <Route path="/login" element={<SocialLoginPage />} />
          <Route
            path="/signup/id"
            element={
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <SignupIDPage />
              </motion.div>
            }
          />
          <Route
              path="/signup/genre"
              element={
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <SignupGenrePage />
                </motion.div>
              }
            />
          <Route path="/signup/splash" element={<SignupSplashScreen />} />

          {/* 메인 홈 */}
          <Route path="/home" element={<HomePage />} />

          {/* 전체 영화 보기 */}
          <Route
            path="/all-movies"
            element={
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <ScrollToTop />
                <AllMoviesPage />
              </motion.div>
            }
          />

          {/* 내가 본 영화 보기 */}
          <Route
            path="/My-movies"
            element={
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <ScrollToTop />
                <MySeenMoviePage />
              </motion.div>
            }
          />

          {/* 세부 페이지들 */}
          <Route path="/details" element={<DetailPage />} />
          <Route path="/details/:id" element={<DetailPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/writePosts" element={<WritePostPage />} />
          <Route path="/postDetails" element={<PostDetailPage />} />

          {/* 404 페이지 */}
          <Route
            path="*"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollToTop />
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
