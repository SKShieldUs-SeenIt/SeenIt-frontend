// src/reducers/movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popular: [],
  search: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchPopularMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPopularMoviesSuccess: (state, action) => {
      state.popular = action.payload;
      state.loading = false;
    },
    fetchPopularMoviesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // 🧠 검색용 리듀서
    fetchSearchMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSearchMoviesSuccess: (state, action) => {
      state.search = action.payload;
      state.loading = false;
    },
    fetchSearchMoviesFailure: (state, action) => {
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
} = movieSlice.actions;

export default movieSlice.reducer;
