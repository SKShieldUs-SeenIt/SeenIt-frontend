// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import SearchBar from '../components/home/SearchBar';
import MovieCard from '../components/home/MovieCard';
import SearchPopup from '../components/search/SearchPopup';
import './HomePage.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../actions/userAction';
import { fetchPopularMovies, fetchUserRatedMovies } from '../actions/movieAction';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [backgroundPoster, setBackgroundPoster] = useState(null);
  const [hoverTimer, setHoverTimer] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const popularMovies = useSelector((state) => state.movies.popular);
  const ratedMovies = useSelector((state) => state.movies.ratedMovies);

  // ✅ 초기 데이터 fetch
  useEffect(() => {
    dispatch(fetchUserInfo()).then((user) => {
      if (user?.userId) {
        dispatch(fetchUserRatedMovies(user.userId));
      }
    });
    dispatch(fetchPopularMovies(20)); // 전체 fetch
  }, [dispatch]);

  // ✅ Hover 이벤트 핸들러
  const handleCardHoverStart = (posterUrl) => {
    const timer = setTimeout(() => {
      setBackgroundPoster(posterUrl);
    }, 300);
    setHoverTimer(timer);
  };

  const handleCardHoverEnd = () => {
    clearTimeout(hoverTimer);
    setBackgroundPoster(null);
  };

  const visiblePopularMovies = popularMovies.slice(0, 10); // ✅ 딱 10개만

  return (
    <div className="homepage-container">
      {/* 🎬 배경 포스터 */}
      <AnimatePresence>
        {backgroundPoster && (
          <motion.div
            key={backgroundPoster}
            className="background-fade-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `url(${backgroundPoster})`,
            }}
          />
        )}
      </AnimatePresence>

      {showSearchPopup && <SearchPopup onClose={() => setShowSearchPopup(false)} />}

      <motion.div
        className="homepage"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Header />
        <SearchBar onClick={() => setShowSearchPopup(true)} />

        {/* 🎬 인기 영화 */}
        <section className="movie-section">
          <div className="section-header">
            <h2 className="section-title">인기 영화</h2>
            <button
              className="view-all-button"
              onClick={() => navigate('/all-movies')}
            >
              View All
            </button>
          </div>

          <Swiper
            key={`popular-${visiblePopularMovies.length}`}
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            initialSlide={Math.floor(visiblePopularMovies.length / 2 -2)}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {visiblePopularMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="custom-slide">
                <MovieCard
                  title={movie.title}
                  posterPath={
                    movie.posterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                      : null
                  }
                  combinedRating={movie.combinedRating}
                  reviewCount={movie.reviewCount}
                  tmdbId={movie.tmdbId}
                  onHoverStart={handleCardHoverStart}
                  onHoverEnd={handleCardHoverEnd}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* ⭐ 내가 평점 준 영화 */}
        <section className="movie-section">
          <div className="section-header">
            <h2 className="section-title">내가 평점 준 영화</h2>
            <button
              className="view-all-button"
              onClick={() => navigate('/My-movies')}
            >
              View All
            </button>
          </div>

          <Swiper
            key={`rated-${ratedMovies.length}`}
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            initialSlide={Math.floor(ratedMovies.length / 2)}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {ratedMovies.map((movie, idx) => (
              <SwiperSlide key={`rated-${idx}`} className="custom-slide">
                <MovieCard
                  title={movie.movieTitle}
                  posterPath={
                    movie.moviePosterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.moviePosterPath}`
                      : null
                  }
                  isUserRated={true}
                  score={movie.score}
                  tmdbId={movie.tmdbId ?? movie.movieId}
                  hideReviewCount={true}
                  onHoverStart={handleCardHoverStart}
                  onHoverEnd={handleCardHoverEnd}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </motion.div>
    </div>
  );
}
