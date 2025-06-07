// src/pages/MySeenMoviePage.jsx
import React, { useEffect, useState } from 'react';
import styles from './MySeenMoviePage.module.css';
import MovieCard from '../components/home/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRatedMovies } from '../actions/movieAction';

export default function MySeenMoviePage() {
  const dispatch = useDispatch();
  const ratedMovies = useSelector((state) => state.movies.ratedMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    dispatch(fetchUserRatedMovies()); // userId는 내부에서 추출
  }, [dispatch]);

  const start = (currentPage - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  const visibleMovies = ratedMovies.slice(start, end);
  const totalPages = Math.ceil(ratedMovies.length / moviesPerPage);

  return (
    <div className={styles.mySeenMoviePage}>
      <h1 className={styles.pageTitle}>내가 본 영화</h1>

      <div className={styles.movieGrid}>
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.movieTitle}
            posterPath={
              movie.moviePosterPath
                ? `https://image.tmdb.org/t/p/w500${movie.moviePosterPath}`
                : null
            }
            score={movie.score}
            isUserRated={true}
            tmdbId={movie.tmdbId ?? movie.movieId}
            hideReviewCount={true}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={currentPage === idx + 1 ? styles.activePage : ''}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
