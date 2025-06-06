import React, { useState, useEffect } from "react";
import styles from "./WritePostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";

function WritePostsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // 페이지 새로 고침 시 input 필드를 비워줍니다.
    setTitle("");
    setDescription("");
  }, []);

  const handleSubmit = () => {
    if (title.trim() === "" || description.trim() === "") {
      setShowWarningModal(true);
      return;
    }

    const newPost = {
      id: Date.now(), // 고유 ID
      title,
      description,
      username: "User Name",
      createdAt: new Date().toLocaleString(),
    };

    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = [newPost, ...savedPosts];

    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    navigate("/posts", { state: { newPost } });
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
          {/* <CommonMovieInfo
            title="The Last of Us"
            director="Neil Druckmann"
            poster={moviePoster}
          /> */}

          <motion.div
            className={styles["post-card"]}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className={styles["post-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
              <span className={styles["user-name"]}>User Name</span>
              <div className={styles["post-buttons"]}>
                <button
                  className={styles["btn-cancel"]}
                  onClick={() => navigate("/posts")}
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
