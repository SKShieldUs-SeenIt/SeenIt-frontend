import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 카카오 토큰 받아오기
export const fetchKakaoToken = createAsyncThunk(
  'auth/fetchKakaoToken',
  async (code, thunkAPI) => {
    try {
      const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
      const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token`,
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKakaoToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchKakaoToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      })
      .addCase(fetchKakaoToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
