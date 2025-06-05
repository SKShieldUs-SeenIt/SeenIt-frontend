import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import movieReducer from './movieSlice';


const store = configureStore({
  reducer: {
     auth: authReducer,
    search: searchReducer,
    user: userReducer,
   movies: movieReducer,

  },
});

export default store;