import React, { useState } from 'react';
import Header from '../components/home/Header';
import SearchBar from '../components/home/SearchBar';
import MovieCard from '../components/home/MovieCard';
import './HomePage.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const dummyMovies = Array.from({ length: 10 });

  return (
    <div className="homepage-container">
      {showSearchOverlay && (
        <div className="overlay">
          <motion.div
            className="search-popup"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
              autoFocus
            />
            <button className="close-btn" onClick={() => setShowSearchOverlay(false)}>
              닫기
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        className="homepage"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Header />
        <SearchBar onClick={() => setShowSearchOverlay(true)} />

        {/* 최신 영화 섹션 */}
        <section className="movie-section">
          <h2 className="section-title">최신 영화</h2>
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {dummyMovies.map((_, i) => (
              <SwiperSlide key={i} className="custom-slide">
                <MovieCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 내가 본 영화 섹션 */}
        <section className="movie-section">
          <h2 className="section-title">내가 본 영화</h2>
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={10}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 80,
              modifier: -1,
              slideShadows: false,
            }}
            className="swiper-container"
          >
            {dummyMovies.map((_, i) => (
              <SwiperSlide key={`watched-${i}`} className="custom-slide">
                <MovieCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </motion.div>
    </div>
  );
}
