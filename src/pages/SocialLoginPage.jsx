import React from 'react';
import './SocialLoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function SocialLoginPage() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleSignupClick = () => {
    navigate('/signup/splash');
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
