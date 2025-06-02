// src/pages/AuthCallback.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchKakaoLogin } from '../reducers/authSlice';

export default function AuthCallback() {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      console.log('인가 코드:', code);
      dispatch(fetchKakaoLogin(code));
    } else {
      console.error('카카오 인가 코드 없음');
    }
  }, [dispatch]);

  return <div>로그인 중입니다...</div>;
}
