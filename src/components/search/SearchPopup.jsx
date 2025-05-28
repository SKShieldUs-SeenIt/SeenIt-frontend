import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import MovieCard from '../home/MovieCard';
import './SearchPopup.css';

export default function SearchPopup({ onClose, movies = [] }) {
  return (
    <div className="overlay">
      <motion.div
        className="search-popup"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="popup-header">
          <input
            type="text"
            className="search-input"
            placeholder="검색어를 입력하세요"
            autoFocus
          />
          <button className="close-btn" onClick={onClose}>
            닫기
          </button>
        </div>

        <h2 className="popup-title">검색 결과</h2>
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
          {(movies ?? []).map((_, i) => (
            <SwiperSlide key={i} className="custom-slide">
              <MovieCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
