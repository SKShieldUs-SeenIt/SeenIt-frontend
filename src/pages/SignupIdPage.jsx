// src/pages/signup/IDPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupIdPage.css';

export default function IDPage() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (userId.trim()) {
      navigate('/signup/profile');
    }
  };

  return (
    <div className="id-container">
      <div className="id-box">
        <h2 className="id-title">먼저 아이디를 입력해주세요</h2>
        <input
          type="text"
          className="id-input"
          placeholder="예: seenit_lover"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="id-next-btn" onClick={handleNext} disabled={!userId.trim()}>
          다음 →
        </button>
      </div>
    </div>
  );
}
