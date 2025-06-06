// src/components/home/MovieCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ title, combinedRating, reviewCount, posterPath, tmdbId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (tmdbId) {
      navigate(`/details/${tmdbId}`);
    } else {
      console.warn('❌ TMDB ID 없음: 이동 실패');
    }
  };

  return (
    <div className="movie-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {posterPath ? (
        <img className="movie-image" src={posterPath} alt={title} />
      ) : (
        <div className="movie-image placeholder">이미지 없음</div>
      )}
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">평점: {combinedRating ?? 'N/A'}</p>
      <p className="movie-summary">리뷰 수: {reviewCount ?? 0}</p>
    </div>
  );
}
