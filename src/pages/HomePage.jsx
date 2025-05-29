import React, { useState } from 'react';
import Header from '../components/home/Header';
import SearchBar from '../components/home/SearchBar';
import MovieCard from '../components/home/MovieCard';
import SearchPopup from '../components/search/SearchPopup';
import './HomePage.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const dummyMovies = Array.from({ length: 10 });

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
          <h2 className="section-title">최신 영화</h2>
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={5}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 80,
              modifier: 1,
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
