
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


// src/main.jsx (또는 index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);