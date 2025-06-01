// src/pages/SocialLoginPage.jsx
import React from 'react';
import './SocialLoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function SocialLoginPage() {
      const navigate = useNavigate();
  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 로직 연결
    console.log('카카오 로그인');
  };

    const handleSignupClick = () => {
    navigate('/signup/splash'); // 회원가입 스플래쉬 화면으로 이동
  };

  return (
    <div className="login-container">
      <h1 className="login-title">SeenIt?</h1>
      <p className="login-subtitle">소셜 계정으로 로그인해주세요</p>

      <div className="login-buttons">
        <button className="kakao-btn" onClick={handleKakaoLogin}>카카오로 로그인</button>
         <button onClick={handleSignupClick}>회원가입 테스트용 이동</button>
      </div>
    </div>
  );
}
