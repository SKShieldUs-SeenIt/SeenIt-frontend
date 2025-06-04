// src/pages/AllMoviesPage.jsx
import React from 'react';
import MovieCard from '../components/home/MovieCard';
import './AllMoviesPage.css'; // 스타일은 별도 파일

export default function AllMoviesPage() {
  const dummyMovies = Array.from({ length: 100 });

  return (
    <div className="all-movies-page">
      <h1 className="page-title">최신 영화 100</h1>
      <div className="movie-grid">
        {dummyMovies.map((_, i) => (
          <MovieCard key={i} />
        ))}
      </div>
    </div>
  );
}
