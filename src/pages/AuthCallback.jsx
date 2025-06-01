import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchKakaoToken } from '../reducers/authSlice';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      dispatch(fetchKakaoToken(code)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate('/home');
        } else {
          alert('로그인 실패');
          navigate('/login');
        }
      });
    }
  }, [code]);

  return <div>로그인 중입니다...</div>;
}
