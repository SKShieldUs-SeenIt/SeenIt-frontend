import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
     auth: authReducer,
    search: searchReducer,
  },
});

export default store;