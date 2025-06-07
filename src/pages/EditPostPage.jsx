import React, { useState, useEffect } from "react";
import styles from "./WritePostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import WarningModal from "../components/modal/WarningModal";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatePost } from "../actions/postAction";
import { useSelector } from "react-redux";

function EditPostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const post = location.state;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.body);
  const [movie, setMovie] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const user = useSelector((state) => state.user.user);

  // 영화 정보 불러오기
  useEffect(() => {
    if (post.contentType === "MOVIE" && post.contentId) {
      axios
        .get(`/api/movies/${post.contentId}`)
        .then((res) => {
          setMovie(res.data);
        })
        .catch((err) => {
          console.error("영화 정보 불러오기 실패:", err);
        });
    }
  }, [post.contentType, post.contentId]);

  const handleUpdate = async () => {
    if (title.trim() === "" || description.trim() === "") {
      setWarningMessage("제목 또는 내용을 입력해주세요.");
      setShowWarningModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", description);
    formData.append("contentType", post.contentType);
    formData.append("contentId", post.contentId);

    try {
      await dispatch(updatePost(post.code, formData));
      setWarningMessage("게시글이 수정되었습니다.");
      setShowWarningModal(true);
      setTimeout(() => {
        setShowWarningModal(false);
        navigate(`/postDetails/${post.code}`, {
          state: {
            ...post,
            title,
            body: description,
          },
        });
      }, 1200);
    } catch (err) {
      console.error("게시글 수정 실패", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader title="Edit Post" />
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
                  onClick={() => navigate(-1)}
                >
                  cancel
                </button>
                <button className={styles["btn-submit"]} onClick={handleUpdate}>
                  save
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

        {showWarningModal && (
          <WarningModal
            message={warningMessage}
            onClose={() => setShowWarningModal(false)}
          />
        )}
      </div>
    </motion.div>
  );
}

export default EditPostPage;
