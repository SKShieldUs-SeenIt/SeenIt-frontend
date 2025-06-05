// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/home/Header';
import SearchBar from '../components/home/SearchBar';
import MovieCard from '../components/home/MovieCard';
import SearchPopup from '../components/search/SearchPopup';
import './HomePage.css';
import { fetchUserInfo } from '../actions/userAction';
import { fetchPopularMovies } from '../actions/movieAction';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ store에서 가져오기
  const popularMovies = useSelector((state) => state.movies.popular);

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchPopularMovies(10)); // 🎯 action 사용
  }, [dispatch]);

  return (
    <div className="homepage-container">
      {showSearchPopup && (
        <SearchPopup onClose={() => setShowSearchPopup(false)} />
      )}

      <motion.div
        className="homepage"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Header />
        <SearchBar onClick={() => setShowSearchPopup(true)} />

        {/* 최신 영화 섹션 */}
        <section className="movie-section">
          <h2 className="section-title">인기 영화</h2>
          <button
            className="view-all-button"
            onClick={() => navigate('/all-movies')}
          >
            View All
          </button>

              <Swiper
                key={popularMovies.length} // 👈 Swiper를 새로 마운트하게 만듦
                modules={[EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={5}
                initialSlide={Math.floor(popularMovies.length / 2)}
                coverflowEffect={{
                  rotate: 10,
                  stretch: 0,
                  depth: 80,
                  modifier: -1,
                  slideShadows: false,
                }}
                className="swiper-container"
              >
            {popularMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="custom-slide">
                <MovieCard
                  title={movie.title}
                  rating={movie.userAverageRating}
                  summary={`리뷰 수: ${movie.reviewCount || 0}`}
                  posterPath={
                    movie.posterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                      : null
                  }
                  tmdbId={movie.tmdbId}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 내가 본 영화 섹션 (dummy) */}
        <section className="movie-section">
          <h2 className="section-title">내가 본 영화</h2>
          <button
            className="view-all-button"
            onClick={() => navigate('/My-movies')}
          >
            View All
          </button>
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            initialSlide={2}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <SwiperSlide key={`watched-${i}`} className="custom-slide">
                <MovieCard
                  title={`본 영화 ${i}`}
                  rating={4.2}
                  summary={`리뷰 수: 5`}
                  posterPath={null}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </motion.div>
    </div>
  );
}
