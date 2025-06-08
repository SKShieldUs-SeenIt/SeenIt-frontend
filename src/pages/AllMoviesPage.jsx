// src/pages/AllMoviesPage.jsx
import React, { useEffect, useState } from 'react';
import styles from './AllMoviesPage.module.css';
import MovieCard from '../components/home/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPopularMovies,
  fetchLatestMovies,
  fetchRecommendedMovies,
} from '../actions/movieAction';

export default function AllMoviesPage() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 14;

  const { popular, latest, recommended, loading } = useSelector((state) => state.movies);
  const userPreferredGenres = useSelector((state) => state.user.user?.preferredGenres || []);
  const [selectedGenre, setSelectedGenre] = useState('');

  const [visibleMovies, setVisibleMovies] = useState([]);

  // 추천 탭 진입 시 기본 장르로 초기 fetch
  useEffect(() => {
    if (filter === 'popular') {
      dispatch(fetchPopularMovies(100));
    } else if (filter === 'latest') {
      dispatch(fetchLatestMovies(100));
    } else if (filter === 'recommended' && userPreferredGenres.length > 0) {
      const defaultGenre = userPreferredGenres[0];
      setSelectedGenre(defaultGenre);
      dispatch(fetchRecommendedMovies(defaultGenre, 0, 100));
    }
  }, [dispatch, filter, userPreferredGenres]);

  // 장르 변경 시 추천영화 새로 요청
  useEffect(() => {
    if (filter === 'recommended' && selectedGenre) {
      dispatch(fetchRecommendedMovies(selectedGenre, 0, 100));
    }
  }, [selectedGenre]);

  // 필터 적용된 영화 보여주기
  useEffect(() => {
    const allMovies =
      filter === 'popular'
        ? popular
        : filter === 'latest'
        ? latest
        : recommended;

    const start = (currentPage - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    setVisibleMovies(allMovies.slice(start, end));
  }, [popular, latest, recommended, currentPage, filter]);

  const totalPages = Math.ceil(
    (filter === 'popular'
      ? popular.length
      : filter === 'latest'
      ? latest.length
      : recommended.length) / moviesPerPage
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
        <button
          className={`${styles.filterButton} ${filter === 'recommended' ? styles.active : ''}`}
          onClick={() => {
            setFilter('recommended');
            setCurrentPage(1);
          }}
        >
          추천영화
        </button>

        {/* 🎯 추천영화 장르 선택 */}
        {filter === 'recommended' && userPreferredGenres.length > 0 && (
          <select
            className={styles.genreSelect}
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1);
            }}
          >
            {userPreferredGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        )}
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
