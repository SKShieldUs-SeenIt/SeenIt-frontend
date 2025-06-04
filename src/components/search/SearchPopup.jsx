import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './SearchPopup.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCard from '../home/MovieCard';

// 더미 영화 데이터
const dummyMovies = [
  { id: 1, title: 'Inception' },
  { id: 2, title: 'The Dark Knight' },
  { id: 3, title: 'Interstellar' },
  { id: 4, title: 'Parasite' },
  { id: 5, title: 'La La Land' },
];

export default function SearchPopup({ onClose }) {
  const navigate = useNavigate();

  const handleGoToDetail = (id) => {
    onClose();
    navigate(`/details/${id}`);
  };

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.searchPopup}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.popupHeader}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search for movies..."
            autoFocus
          />
          <button className={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <h2 className={styles.popupTitle}>검색 결과</h2>

        <Swiper
          grabCursor={true}
          spaceBetween={16}
          slidesPerView={'auto'}
          className={styles.swiper}
        >
          {dummyMovies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className={styles.slide}
              onClick={() => handleGoToDetail(movie.id)}
              style={{ cursor: 'pointer' }}
            >
              <MovieCard title={movie.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
