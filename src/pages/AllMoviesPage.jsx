// src/pages/AllMoviesPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './AllMoviesPage.module.css';
import MovieCard from '../components/home/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPopularMovies,
  fetchLatestMovies,
} from '../actions/movieAction';

export default function AllMoviesPage() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const { popular, latest, loading } = useSelector((state) => state.movies);
  const [visibleMovies, setVisibleMovies] = useState([]);

  useEffect(() => {
    if (filter === 'popular') {
      dispatch(fetchPopularMovies(100));
    } else if (filter === 'latest') {
      dispatch(fetchLatestMovies(100));
    }
  }, [dispatch, filter]);

  useEffect(() => {
    const allMovies = filter === 'popular' ? popular : latest;
    const start = (currentPage - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    setVisibleMovies(allMovies.slice(start, end));
  }, [popular, latest, currentPage, filter]);

  const totalPages = Math.ceil(
    (filter === 'popular' ? popular.length : latest.length) / moviesPerPage
  );

  return (
    <div className={styles.allMoviesPage}>
      <h1 className={styles.pageTitle}>모든 영화</h1>

      <div className={styles.filterTabs}>
        <button
          className={`${styles.filterButton} ${filter === 'popular' ? styles.active : ''}`}
          onClick={() => {
            setFilter('popular');
            setCurrentPage(1);
          }}
        >
          인기순
        </button>
        <button
          className={`${styles.filterButton} ${filter === 'latest' ? styles.active : ''}`}
          onClick={() => {
            setFilter('latest');
            setCurrentPage(1);
          }}
        >
          최신순
        </button>
      </div>

      {loading ? (
        <p className={styles.loadingText}>로딩 중...</p>
      ) : (
        <div className={styles.movieGrid}>
          {visibleMovies.map((movie) => (
            <MovieCard
              key={movie.contentId || movie.id}
              title={movie.contentTitle || movie.title}
              posterPath={
                movie.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                  : null
              }
              combinedRating={movie.averageScore || movie.combinedRating}
              reviewCount={movie.ratingCount || movie.reviewCount}
              tmdbId={movie.contentId || movie.tmdbId}
            />
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`${styles.pageButton} ${currentPage === idx + 1 ? styles.active : ''}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
