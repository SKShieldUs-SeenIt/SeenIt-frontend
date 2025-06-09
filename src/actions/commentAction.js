import axios from "axios";

import {
  fetchSuccess,
  createSuccess,
  updateSuccess,
  deleteSuccess,
} from "../reducers/commentSlice";

// 댓글 불러오기
export const fetchCommentsByPost = (postCode) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.get(`/api/posts/${postCode}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchSuccess(res.data));
  } catch (err) {
    console.error("❌ 댓글 불러오기 실패:", err);
  }
};

// 댓글 전체 조회
export const fetchComments = (postCode) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.get(`/api/posts/${postCode}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "comment/fetchSuccess", payload: res.data });
  } catch (err) {
    console.error("❌ 댓글 불러오기 실패:", err);
  }
};


// 댓글 생성
export const createComment = (postCode, content, parentId = null) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.post(
      `/api/posts/${postCode}/comments`,
      { content, parentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "comment/createSuccess", payload: res.data });
  } catch (err) {
    console.error("❌ 댓글 작성 실패:", err);
  }
};

// 댓글 수정
export const updateComment = (id, content) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.put(
      `/api/comments/${id}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: "comment/updateSuccess", payload: res.data });
  } catch (err) {
    console.error("❌ 댓글 수정 실패:", err);
  }
};

// 댓글 삭제
export const deleteComment = (id, postCode) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwtToken");
    await axios.delete(`/api/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ 삭제 성공 후 다시 fetchCommentsByPost 호출해서 최신 댓글로 갱신
    dispatch(fetchCommentsByPost(postCode));
    
    // 또는 이걸 쓸 수도 있어 (단, 상태에서 직접 제거하는 경우)
    // dispatch({ type: "comment/deleteSuccess", payload: id });
  } catch (err) {
    console.error("❌ 댓글 삭제 실패:", err);
  }
};