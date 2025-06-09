import React, { useState, useEffect } from "react";
import styles from "./WritePostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";
import { fetchUserInfo } from "../actions/userAction";
import { createPost } from "../actions/postAction";
import { fetchPostsByContent } from "../actions/postAction";

function WritePostsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const contentId = location.state?.contentId;
  const contentType = location.state?.contentType;
  const user = useSelector((state) => state.user.user);

  const [movie, setMovie] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    // 페이지 새로 고침 시 input 필드를 비워줍니다.
    setTitle("");
    setDescription("");
  }, []);

  useEffect(() => {
    if (contentType === "MOVIE" && contentId) {
      axios
        .get(`/api/movies/${contentId}`)
        .then((res) => {
          setMovie(res.data);
        })
        .catch((err) => {
          console.error("영화 정보 불러오기 실패:", err);
        });
    }
  }, [contentType, contentId]);

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") {
      setShowWarningModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", description);
    formData.append("contentType", contentType);
    formData.append("contentId", contentId);

    try {
      await dispatch(createPost(formData)); 
      await dispatch(fetchPostsByContent(contentType, contentId));
      navigate("/posts", { state: { contentId, contentType } });
    } catch (err) {
      console.error("게시글 등록 중 오류 발생!", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader title="Posts" />
        <motion.div className={styles["post-container"]}>
          {movie && (
            <CommonMovieInfo
              title={movie.title}
              director={movie.releaseDate || "Unknown"}
              poster={
                movie.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                  : moviePoster
              }
            />
          )}

          <motion.div
            className={styles["post-card"]}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className={styles["post-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
              <span className={styles["user-name"]}>{user?.name}</span>
              <div className={styles["post-buttons"]}>
                <button
                  className={styles["btn-cancel"]}
                  onClick={() =>
                    navigate("/posts", { state: { contentId, contentType } })
                  }
                >
                  cancel
                </button>
                <button className={styles["btn-submit"]} onClick={handleSubmit}>
                  submit
                </button>
              </div>
            </div>

            <div className={styles["post-body"]}>
              <div className={styles["title-row"]}>
                <div className={styles["title-label"]}>Title:</div>
                <input
                  type="text"
                  className={styles["title-input"]}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <textarea
                className={styles["description-textarea"]}
                placeholder="Post Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </motion.div>
        </motion.div>

        {/* 경고 모달 */}
        {showWarningModal && (
          <div className={styles["modal-overlay"]}>
            <motion.div
              className={styles["modal-content"]}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className={styles["modal-close-btn"]}
                onClick={() => setShowWarningModal(false)}
              >
                ×
              </button>
              <p>제목 또는 내용을 입력해주세요.</p>
              <div className={styles["modal-buttons"]}>
                <button
                  className={`${styles.btn} ${styles.confirm}`}
                  onClick={() => setShowWarningModal(false)}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default WritePostsPage;
