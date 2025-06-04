import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';


const store = configureStore({
  reducer: {
     auth: authReducer,
    search: searchReducer,
    user: userReducer,

  },
});

export default store;