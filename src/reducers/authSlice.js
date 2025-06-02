// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchKakaoLogin = createAsyncThunk(
  'auth/fetchKakaoLogin',
  async (code, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`,
        { code }
      );
      return response.data; // 로그인 응답 데이터
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      return thunkAPI.rejectWithValue(error.response?.data || '카카오 로그인 오류');
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKakaoLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKakaoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchKakaoLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '카카오 로그인 실패';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
