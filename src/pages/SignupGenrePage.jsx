// src/pages/signup/SignupGenrePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupGenrePage.css';

export default function SignupGenrePage() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const genres = ['액션', '로맨스', '코미디', '스릴러', 'SF', '애니메이션', '다큐멘터리', '드라마'];

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleComplete = () => {
    if (selectedGenres.length === 0) {
      alert('최소 한 개의 장르를 선택해주세요!');
      return;
    }
    navigate('/signup/complete'); // 완료 화면으로 이동
  };

  return (
    <div className="genre-container">
      <h2 className="genre-title">선호하는 장르를 선택해주세요</h2>
      <div className="genre-list">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <button className="genre-complete-btn" onClick={handleComplete}>
        완료 →
      </button>
    </div>
  );
}
