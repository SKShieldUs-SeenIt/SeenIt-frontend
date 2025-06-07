import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.comments = action.payload;
    },
    createSuccess: (state, action) => {
      state.comments.push(action.payload);
    },
    updateSuccess: (state, action) => {
      const idx = state.comments.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) state.comments[idx] = action.payload;
    },
    deleteSuccess: (state, action) => {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  fetchSuccess,
  createSuccess,
  updateSuccess,
  deleteSuccess,
} = commentSlice.actions;

export default commentSlice.reducer;