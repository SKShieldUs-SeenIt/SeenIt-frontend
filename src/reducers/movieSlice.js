// src/reducers/movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popular: [],
  search: [],
  loading: false,
  error: null,
  ratedMovies: [],

};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
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
     fetchUserRatedMoviesStart: (state) => {
    state.loading = true;
    state.error = null;
  },
  fetchUserRatedMoviesSuccess: (state, action) => {
    state.loading = false;
    state.ratedMovies = action.payload;
  },
  fetchUserRatedMoviesFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
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
} = movieSlice.actions;

export default movieSlice.reducer;
