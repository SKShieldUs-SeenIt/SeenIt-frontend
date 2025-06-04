// src/actions/userAction.js
import axios from 'axios';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserSuccess,
  updateUserFailure,
} from '../reducers/userSlice';

/**
 * 🔐 현재 로그인한 사용자 정보 가져오기 (GET /api/auth/me)
 */
export const fetchUserInfo = () => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  console.log('[fetchUserInfo] 🔑 토큰:', token);

  if (!token) {
    console.warn('[fetchUserInfo] ❌ 토큰 없음 - 요청 중단');
    return;
  }

  try {
    dispatch(fetchUserStart());

    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('[fetchUserInfo] ✅ 유저 정보:', res.data);
    dispatch(fetchUserSuccess(res.data));
  } catch (error) {
    console.error('[fetchUserInfo] ❌ /me 요청 실패:', error);
    dispatch(fetchUserFailure(error.message));
    localStorage.removeItem('jwtToken');
  }
};

/**
 * ✏️ 사용자 정보 수정 (PUT /api/user/me)
 * @param {string} nickname - 새로운 닉네임
 * @param {string[]} genres - 선호 장르 목록 (배열)
 */
export const updateUserInfo = (nickname, genres) => async (dispatch) => {
  const token = localStorage.getItem('jwtToken');
  console.log('[updateUserInfo] 🔐 토큰:', token);

  if (!token) {
    console.warn('[updateUserInfo] ❌ 토큰 없음 - 수정 불가');
    dispatch(updateUserFailure('No token found'));
    return;
  }

  const payload = {
    name: nickname,
    preferredGenres: genres,
  };

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('[updateUserInfo] ✅ 유저 정보 수정 성공:', res.data);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    console.error('[updateUserInfo] ❌ 유저 정보 수정 실패:', err);
    dispatch(updateUserFailure(err.message));
    throw err; // 호출한 쪽에서 try-catch 필요 시
  }
};
