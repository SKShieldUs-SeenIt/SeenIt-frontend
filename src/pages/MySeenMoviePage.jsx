// src/pages/AllMoviesPage.jsx

import React, { useEffect, useState } from 'react';
import './AllMoviesPage.css';
import MovieCard from '../components/home/MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRatedMovies } from '../actions/movieAction';
export default function AllMoviesPage() {
  const dispatch = useDispatch();
  const ratedMovies = useSelector((state) => state.movies.ratedMovies);
  const userId = useSelector((state) => state.user.user?.id); // ✅ 여기로 옮겨야 함
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRatedMovies(userId));
    }
  }, [dispatch, userId]);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMovies = ratedMovies.slice(startIndex, endIndex);

  const totalPages = Math.ceil(ratedMovies.length / ITEMS_PER_PAGE);

  return (
    <div className="all-movies-page">
      <h1 className="page-title">내가 평점 준 영화 리스트</h1>

      <div className="movie-list">
        {currentMovies.map((movie, i) => (
          <MovieCard
            key={`rated-${i}`}
            title={movie.movieTitle}
            posterPath={
                    movie.moviePosterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.moviePosterPath}`
                      : null
                  }  
            rating={movie.rating}
            isMyScore // 내가 준 평점 표시용
            summary={movie.content?.slice(0, 40) ?? '리뷰 없음'}
            tmdbId={movie.tmdbId ?? movie.movieId}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            className={`page-button ${currentPage === idx + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
