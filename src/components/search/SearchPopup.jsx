// src/components/search/SearchPopup.jsx
import React, { useEffect, useState } from 'react';
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
  const searchResults = useSelector((state) => state.movies.search);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== '') {
        dispatch(fetchSearchMovies(query));
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, dispatch]);

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
            placeholder="영화를 검색해보세요"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>

        <h2 className={styles.popupTitle}>검색 결과</h2>

        <Swiper grabCursor={true} spaceBetween={16} slidesPerView={'auto'} className={styles.swiper}>
          {searchResults.map((movie) => (
            <SwiperSlide
              key={movie.id}
              className={styles.slide}
              onClick={() => handleGoToDetail(movie.tmdbId)}
              style={{ cursor: 'pointer' }}
            >
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
      </motion.div>
    </div>
  );
}
