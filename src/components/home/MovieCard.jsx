// src/components/home/MovieCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

export default function MovieCard({
  title,
  combinedRating,
  score,
  reviewCount,
  posterPath,
  tmdbId,
  isUserRated = false,
  onHoverStart,
  onHoverEnd,
}) {
  const navigate = useNavigate();

 const handleClick = () => {
  console.log("📦 Clicked Movie tmdbId:", tmdbId);
  if (tmdbId) navigate(`/details/${tmdbId}`);
  else console.warn("❌ tmdbId 없음 - 이동 실패");
};

  const handleMouseEnter = () => {
    if (onHoverStart && posterPath) {
      
      onHoverStart(posterPath); // ⬅️ 포스터 URL 전달
    }
  };

  const handleMouseLeave = () => {
    if (onHoverEnd) {
      onHoverEnd();
    }
  };

  const ratingText = isUserRated
    ? `내 평점: ${score ?? 'N/A'}`
    : `평점: ${combinedRating ?? 'N/A'}`;

  const ratingClass = isUserRated ? 'user-rating' : 'global-rating';

  return (
    <div
      className="movie-card"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`rating-badge ${ratingClass}`}>{ratingText}</div>

      {posterPath ? (
        <img className="movie-image" src={posterPath} alt={title} />
      ) : (
        <div className="movie-image placeholder">이미지 없음</div>
      )}

      <div className="movie-info-overlay">
        <h3 className="movie-title">{title}</h3>
        {!isUserRated && reviewCount !== undefined && (
          <p className="movie-summary">리뷰 수: {reviewCount}</p>
        )}
      </div>
    </div>
  );
}
