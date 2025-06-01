import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupSplashScreen.css';

export default function SignupSplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signup/id'); // 자동 이동
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="signup-splash">
      <h1 className="signup-text">환영합니다!</h1>
      <p className="signup-subtitle">회원가입을 시작합니다...</p>
    </div>
  );
}
