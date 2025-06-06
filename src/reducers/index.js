import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import reviewReducer from './reviewSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    user: userReducer,
    movies: movieReducer,
    reviews: reviewReducer,
  },
});

export default store;