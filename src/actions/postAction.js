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
    const token = localStorage.getItem("jwtToken");
    const res = await axios.get(`/api/posts`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
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

// 🆕 게시글 단건 불러오기 (post_code 기반)
export const fetchPostByCode = (postCode) => async () => {
  try {
    const token = localStorage.getItem("jwtToken")
    const res = await axios.get(`/api/posts/${postCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data; // 필요하면 여기서 dispatch 해도 됨
  } catch (err) {
    console.error("❌ 게시글 불러오기 실패:", err);
    throw err;
  }
};

export const fetchPostsByContent = (type, id) => async (dispatch) => {
  dispatch(fetchPostsStart());
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.get(`/api/posts/content?type=${type}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchPostsSuccess(res.data));
  } catch (err) {
    dispatch(fetchPostsFailure(err.message));
  }
};

export const deletePost = (postId) => async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    await axios.delete(`/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("❌ 게시글 삭제 실패:", err);
    throw err;
  }
};
