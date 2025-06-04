// src/actions/userAction.js
import axios from 'axios';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from '../reducers/userSlice';

export const fetchUserInfo = () => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  console.log('[fetchUserInfo] 토큰:', token);

  if (!token) {
    console.warn('[fetchUserInfo] ❌ 토큰 없음');
    return;
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  dispatch(fetchUserStart());

  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`);
    console.log('[fetchUserInfo] ✅ 유저 정보:', res.data);
    dispatch(fetchUserSuccess(res.data));
  } catch (error) {
    console.error('[fetchUserInfo] ❌ /me 요청 실패:', error);
    dispatch(fetchUserFailure(error.message));
    localStorage.removeItem('jwtToken');
  }
};
