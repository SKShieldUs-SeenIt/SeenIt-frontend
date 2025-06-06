import axios from "axios";
import {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReviewSuccess,
  updateReviewSuccess,
  deleteReviewSuccess,
} from "../reducers/reviewSlice";

// 리뷰 전체 조회
export const fetchReviews = (movieId) => async (dispatch) => {
  dispatch(fetchReviewsStart());
  try {
    const token = localStorage.getItem("jwtToken");

    const response = await axios.get(`/api/reviews/movies/${movieId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}, // ⬅️ 조건부 추가
    });

    dispatch(fetchReviewsSuccess(response.data.content || []));
  } catch (error) {
    dispatch(fetchReviewsFailure(error.message));
  }
};


// 리뷰 추가
export const addReview = (movieId, content, rating) => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/reviews`,
      { movieId, content, rating }, // ⬅️ JSON 형식 OK
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
         withCredentials: true,
      }
    );
    dispatch(addReviewSuccess(response.data)); // 🔥 추가 성공
  } catch (error) {
    console.error(error);
  }
};


// 리뷰 수정
export const updateReview = (reviewId, content, rating) => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await axios.put(
      `/api/reviews/${reviewId}`,
      { content, rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateReviewSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
};

// 리뷰 삭제
export const deleteReview = (reviewId) => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  try {
    await axios.delete(`/api/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteReviewSuccess(reviewId));
  } catch (error) {
    console.error(error);
  }
};
