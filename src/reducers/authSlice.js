import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null, // 필요 시 사용자 정보 저장
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그인 성공 시 호출되어 토큰을 저장하는 액션
    setToken(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.accessToken;  // 액세스 토큰 저장
      state.user = action.payload.user || null; // 사용자 정보 (필요 시)
      state.error = null;
    },
    
    // 로그아웃 시 호출되어 인증 상태 초기화
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
    
    // 로그인 오류 처리 (예: 토큰 발급 실패, 네트워크 오류 등)
    setAuthError(state, action) {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, logout, setAuthError } = authSlice.actions;
export default authSlice.reducer;
