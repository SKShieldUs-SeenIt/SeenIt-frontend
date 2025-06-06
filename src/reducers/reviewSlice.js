import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    fetchReviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    },
    fetchReviewsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addReviewSuccess: (state, action) => {
      state.reviews.unshift(action.payload); // 맨 앞에 추가
    },
    updateReviewSuccess: (state, action) => {
      const index = state.reviews.findIndex(r => r.id === action.payload.id);
      if (index !== -1) state.reviews[index] = action.payload;
    },
    deleteReviewSuccess: (state, action) => {
      state.reviews = state.reviews.filter(r => r.id !== action.payload);
    },
  },
});

export const {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReviewSuccess,
  updateReviewSuccess,
  deleteReviewSuccess,
} = reviewSlice.actions;

export default reviewSlice.reducer;
