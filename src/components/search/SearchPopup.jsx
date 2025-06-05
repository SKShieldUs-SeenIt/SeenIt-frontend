// src/components/search/SearchPopup.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './SearchPopup.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MovieCard from '../home/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchMovies } from '../../actions/movieAction';

export default function SearchPopup({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const { search } = useSelector((state) => state.movies);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        dispatch(fetchSearchMovies(searchTerm));
      }
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  const handleGoToDetail = (tmdbId) => {
    onClose();
    navigate(`/details/${tmdbId}`);
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
            placeholder="영화 제목을 입력하세요..."
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        <h2 className={styles.popupTitle}>검색 결과</h2>

        <Swiper
          grabCursor={true}
          spaceBetween={16}
          slidesPerView={'auto'}
          className={styles.swiper}
        >
          {search.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className={styles.slide}
              onClick={() => handleGoToDetail(movie.tmdbId)}
              style={{ cursor: 'pointer' }}
            >
              <MovieCard
                title={movie.title}
                rating={movie.userAverageRating ?? 'N/A'}
                summary={`리뷰 수: ${movie.reviewCount ?? 0}`}
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
      </motion.div>
    </div>
  );
}
