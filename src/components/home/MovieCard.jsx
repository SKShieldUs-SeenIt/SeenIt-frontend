import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({ title, rating, summary, posterPath, tmdbId }) {
  const navigate = useNavigate();

  // console.log("🧩 MovieCard props:", { title, rating, summary, posterPath, tmdbId });

  const handleClick = () => {
    if (tmdbId) navigate(`/details/${tmdbId}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      {posterPath ? (
        <img className="movie-image" src={posterPath} alt={title} />
      ) : (
        <div className="movie-image placeholder">이미지 없음</div>
      )}
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">평점: {rating ?? 'N/A'}</p>
      <p className="movie-summary">{summary ?? '리뷰 없음'}</p>
    </div>
  );
}

