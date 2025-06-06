// src/reducers/postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchPostsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess(state, action) {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchPostsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addPost(state, action) {
      state.posts.unshift(action.payload); // 최신 글을 위로
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
} = postSlice.actions;

export default postSlice.reducer;
