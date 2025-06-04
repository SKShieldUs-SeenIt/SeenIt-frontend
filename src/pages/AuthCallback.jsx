// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setAuthError } from '../reducers/authSlice';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const isNew = searchParams.get('isNew'); // 문자열로 들어옴: 'true' or 'false'

    if (token) {
      dispatch(setToken(token));
      localStorage.setItem('jwtToken', token);

      if (isNew === 'true') {
        navigate('/signup/splash'); // ✅ 신규 유저: 온보딩 or 회원가입 화면
      } else {
        navigate('/home'); // ✅ 기존 유저: 바로 홈 이동
      }
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
