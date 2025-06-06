// src/actions/reviewAction.js
import axios from "axios";
import {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReviewSuccess,
  updateReviewSuccess,
  deleteReviewSuccess,
} from "../reducers/reviewSlice";

const token = localStorage.getItem("jwt");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// 리뷰 전체 조회
export const fetchReviews = (movieId) => async (dispatch) => {
  dispatch(fetchReviewsStart());
  try {
    const response = await axios.get(`/api/reviews/movies/${movieId}`);
    dispatch(fetchReviewsSuccess(response.data.content || []));
  } catch (error) {
    dispatch(fetchReviewsFailure(error.message));
  }
};

// 리뷰 추가
export const addReview = (movieId, content, rating) => async (dispatch) => {
  try {
    const response = await axios.post("/api/reviews", {
      movieId,
      content,
      rating,
    });
    dispatch(addReviewSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};

// 리뷰 수정
export const updateReview = (reviewId, content, rating) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/reviews/${reviewId}`, {
      content,
      rating,
    });
    dispatch(updateReviewSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};

// 리뷰 삭제
export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    await axios.delete(`/api/reviews/${reviewId}`);
    dispatch(deleteReviewSuccess(reviewId));
  } catch (error) {
    console.error(error);
  }
};