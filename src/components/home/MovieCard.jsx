import React from 'react';
import './MovieCard.css';

export default function MovieCard() {
  return (
    <div className="movie-card">
      <div className="movie-image" />
      <h3 className="movie-title">영화 이름</h3>
      <p className="movie-rating">평점: 4.3</p>
      <p className="movie-summary">최근 만든 리뷰...</p>
    </div>
  );
}