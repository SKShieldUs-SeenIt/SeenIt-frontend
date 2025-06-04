// src/pages/signup/SignupCompletePage.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupCompletePage.css';

export default function SignupCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname, genres } = location.state || {};

  useEffect(() => {
    if (!nickname || !genres) {
      alert('회원가입 정보가 누락되었습니다.');
      navigate('/');
      return;
    }

    const completeSignup = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const payload = {
          name: nickname,
          preferredGenres: genres, // ✅ 리스트 그대로 전송
        };

        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/me`, payload);

        console.log('✅ 회원정보 업데이트 완료');
        setTimeout(() => navigate('/home'), 2000);
      } catch (err) {
        console.error('❌ 업데이트 실패:', err);
        alert('회원정보 저장 중 오류가 발생했습니다.');
        navigate('/');
      }
    };

    completeSignup();
  }, [nickname, genres, navigate]);

  return (
    <div className="signup-complete-container">
      <h1 className="signup-complete-title">🎉 회원가입이 완료되었습니다!</h1>
      <p className="signup-complete-subtitle">잠시 후 홈으로 이동합니다...</p>
    </div>
  );
}
    