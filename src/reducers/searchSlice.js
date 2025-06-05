// src/reducers/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchSearchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSearchSuccess: (state, action) => {
      state.results = action.payload;
      state.loading = false;
    },
    fetchSearchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSearchResults: (state) => {
      state.results = [];
    },
  },
});

export const {
  fetchSearchStart,
  fetchSearchSuccess,
  fetchSearchFailure,
  clearSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
