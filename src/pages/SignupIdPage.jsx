// src/pages/signup/IDPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupIdPage.css';

export default function IDPage() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (nickname.trim()) {
      navigate('/signup/genre', {
        state: { nickname }, // nickname 전달
      });
    } else {
      alert('닉네임을 입력해주세요!');
    }
  };

  return (
    <div className="id-container">
      <div className="id-box">
        <h2 className="id-title">먼저 닉네임을 입력해주세요 :)</h2>
        <input
          type="text"
          className="id-input"
          placeholder="예: seenit_lover"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button className="id-next-btn" onClick={handleNext} disabled={!nickname.trim()}>
          다음 →
        </button>
      </div>
    </div>
  );
}
