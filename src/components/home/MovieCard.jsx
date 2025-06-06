import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 이거 빠져있었음!
import './MovieCard.css';

export default function MovieCard({
  title,
  combinedRating,
  score,
  reviewCount,
  posterPath,
  tmdbId,
  isUserRated = false,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (tmdbId) navigate(`/details/${tmdbId}`);
  };

  const ratingText = isUserRated
    ? ` 내 평점: ${score ?? 'N/A'}`
    : ` 평균 평점: ${combinedRating ?? 'N/A'}`;

  const ratingClass = isUserRated ? 'user-rating' : 'global-rating';

  return (
    <div className="movie-card" onClick={handleClick}>
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
