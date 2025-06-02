
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
});

export const { setKeyword, setResults, clearResults } = searchSlice.actions;
export default searchSlice.reducer;