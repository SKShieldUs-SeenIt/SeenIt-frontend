// src/pages/KakaoCallback.jsx

import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setAuthError } from '../reducers/authSlice';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      dispatch(setToken(token)); // Redux 저장
      localStorage.setItem('jwtToken', token); // localStorage도 선택적 저장
      navigate('/home');
    } else {
      dispatch(setAuthError('토큰이 전달되지 않았습니다.'));
      navigate('/login');
    }
  }, [searchParams, dispatch, navigate]);

  return (
    <div className="login-container">
      <h1 className="login-title">SeenIt?</h1>
      <p className="login-subtitle">로그인 처리 중입니다...</p>
    </div>
  );
}
