// src/pages/signup/SignupCompletePage.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SignupCompletePage.css';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../actions/userAction'; // ✅ 이미 만든 액션 사용

export default function SignupCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nickname, genres } = location.state || {};

  useEffect(() => {
    if (!nickname || !genres) {
      alert('회원가입 정보가 누락되었습니다.');
      navigate('/');
      return;
    }

    const completeSignup = async () => {
      try {
        await dispatch(updateUserInfo(nickname, genres));
        console.log('✅ 회원가입 정보 업데이트 완료');
        setTimeout(() => navigate('/home'), 2000);
      } catch (err) {
        console.error('❌ 업데이트 실패:', err);
        alert('회원정보 저장 중 오류가 발생했습니다.');
        navigate('/');
      }
    };

    completeSignup();
  }, [nickname, genres, navigate, dispatch]);

  return (
    <div className="signup-complete-container">
      <h1 className="signup-complete-title"> 회원가입이 완료되었습니다!</h1>
      <p className="signup-complete-subtitle">잠시 후 홈으로 이동합니다...</p>
    </div>
  );
}
