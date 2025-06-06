// src/actions/postAction.js
import axios from "axios";
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
} from "../reducers/postSlice";

// 전체 게시글 불러오기
export const fetchAllPosts = () => async (dispatch) => {
  dispatch(fetchPostsStart());
  try {
    const res = await axios.get(`/api/posts`);
    dispatch(fetchPostsSuccess(res.data));
  } catch (err) {
    dispatch(fetchPostsFailure(err.message));
  }
};

// 게시글 추가
export const createPost = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.post(`/api/posts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(addPost(res.data));
  } catch (err) {
    console.error("❌ 게시글 생성 실패:", err);
    throw err;
  }
};
