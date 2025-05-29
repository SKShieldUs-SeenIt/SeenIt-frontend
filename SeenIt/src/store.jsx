import { configureStore } from '@reduxjs/toolkit'
//import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
   // user: userReducer,  // userReducer는 반드시 함수여야 합니다!
  }
})
