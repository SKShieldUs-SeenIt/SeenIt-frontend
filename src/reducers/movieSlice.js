// src/reducers/movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popular: [],
    loading: false,
    error: null,
  },
  reducers: {
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
  },
});

export const {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
} = movieSlice.actions;

export default movieSlice.reducer;
