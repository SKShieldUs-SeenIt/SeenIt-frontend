// src/pages/AllMoviesPage.jsx
import React, { useEffect, useState } from 'react';
import './AllMoviesPage.css';
import MovieCard from '../components/home/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPopularMovies,
  fetchLatestMovies,
} from '../actions/movieAction';

export default function AllMoviesPage() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState('popular'); // 'popular' | 'latest'
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  const { popular, latest, loading } = useSelector((state) => state.movies);
  const [visibleMovies, setVisibleMovies] = useState([]);

  // 📡 🔥 필터가 바뀔 때 API 호출
  useEffect(() => {
    if (filter === 'popular') {
      dispatch(fetchPopularMovies(100));
    } else if (filter === 'latest') {
      dispatch(fetchLatestMovies(100));
    }
  }, [dispatch, filter]);

  // 🎯 필터 & 페이지 변화 시 자르기
  useEffect(() => {
    const allMovies = filter === 'popular' ? popular : latest;
    const start = (currentPage - 1) * moviesPerPage;
    const end = start + moviesPerPage;
    setVisibleMovies(allMovies.slice(start, end));

    console.log(`🧪 필터: ${filter}`, allMovies);
  }, [popular, latest, currentPage, filter]);

  const totalPages = Math.ceil(
    (filter === 'popular' ? popular.length : latest.length) / moviesPerPage
  );

  return (
    <div className="all-movies-page">
      <h1 className="page-title">모든 영화</h1>

      <div className="filter-tabs">
        <button
          className={filter === 'popular' ? 'active' : ''}
          onClick={() => {
            setFilter('popular');
            setCurrentPage(1);
          }}
        >
          인기순
        </button>
        <button
          className={filter === 'latest' ? 'active' : ''}
          onClick={() => {
            setFilter('latest');
            setCurrentPage(1);
          }}
        >
          최신순
        </button>
      </div>

      {loading ? (
        <p className="loading-text">로딩 중...</p>
      ) : (
        <div className="movie-grid">
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

      {/* 페이지네이션 */}
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={currentPage === idx + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
