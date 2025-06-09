// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem('jwtToken');
    },
      updateUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  clearUser,
   updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
