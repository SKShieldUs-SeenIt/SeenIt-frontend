// src/reducers/movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popular: [],
  search: [],
  ratedMovies: [],
  latest: [],
  recommended: [], // ✅ 추가 완료
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // 🔥 인기 영화
    fetchPopularMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPopularMoviesSuccess(state, action) {
      state.popular = action.payload;
      state.loading = false;
    },
    fetchPopularMoviesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // 🔎 검색
    fetchSearchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSearchMoviesSuccess(state, action) {
      state.search = action.payload;
      state.loading = false;
    },
    fetchSearchMoviesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // ⭐ 유저 평점 영화
    fetchUserRatedMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserRatedMoviesSuccess(state, action) {
      state.ratedMovies = action.payload;
      state.loading = false;
    },
    fetchUserRatedMoviesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // 🕘 최신 영화
    fetchLatestMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLatestMoviesSuccess(state, action) {
      state.latest = action.payload;
      state.loading = false;
    },
    fetchLatestMoviesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // 🌟 추천 영화
    fetchRecommendedMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRecommendedMoviesSuccess(state, action) {
      state.recommended = action.payload;
      state.loading = false;
    },
    fetchRecommendedMoviesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,

  fetchSearchMoviesStart,
  fetchSearchMoviesSuccess,
  fetchSearchMoviesFailure,

  fetchUserRatedMoviesStart,
  fetchUserRatedMoviesSuccess,
  fetchUserRatedMoviesFailure,

  fetchLatestMoviesStart,
  fetchLatestMoviesSuccess,
  fetchLatestMoviesFailure,

  fetchRecommendedMoviesStart,     // ✅ export
  fetchRecommendedMoviesSuccess,   // ✅ export
  fetchRecommendedMoviesFailure,   // ✅ export
} = movieSlice.actions;

export default movieSlice.reducer;
