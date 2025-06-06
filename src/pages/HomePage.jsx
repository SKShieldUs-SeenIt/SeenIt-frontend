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
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ store에서 상태 불러오기
  const popularMovies = useSelector((state) => state.movies.popular);
  const ratedMovies = useSelector((state) => state.movies.ratedMovies);

  // ✅ 초기 유저 정보 + 인기 영화
  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchPopularMovies(10));
  }, [dispatch]);

  // ✅ 유저 로드 완료 후 ratedMovies 요청
 useEffect(() => {
  dispatch(fetchUserInfo()).then((user) => {
    if (user?.userId) {
      console.log('✅ userId 추출됨:', user.userId);
      dispatch(fetchUserRatedMovies(user.userId));
    } else {
      console.warn('⚠️ userId 없음 - 평점 영화 못 불러옴');
    }
  });

  dispatch(fetchPopularMovies(10));
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

        {/* 🎬 인기 영화 섹션 */}
        <section className="movie-section">
          <h2 className="section-title">인기 영화</h2>
          <button
            className="view-all-button"
            onClick={() => navigate('/all-movies')}
          >
            View All
          </button>

          <Swiper
            key={`popular-${popularMovies.length}`}
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
                  posterPath={
                    movie.posterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                      : null
                  }
                  combinedRating={movie.combinedRating}
                  reviewCount={movie.reviewCount}
                  tmdbId={movie.tmdbId}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 🎯 내가 평점 준 영화 */}
        <section className="movie-section">
          <h2 className="section-title">내가 평점 준 영화</h2>
                    <button
            className="view-all-button"
            onClick={() => navigate('/My-movies')}
          >
            View All
          </button>
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
                  }                  rating={movie.rating}
                  combinedRating={movie.score}
                  isUserRated={true}   

                  tmdbId={movie.tmdbId ?? movie.movieId}
                  hideReviewCount={true} 

                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </motion.div>
    </div>
  );
}
