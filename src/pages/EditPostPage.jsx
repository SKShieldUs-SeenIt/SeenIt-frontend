import React, { useState, useEffect } from "react";
import styles from "./WritePostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function EditPostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state;

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleUpdate = () => {
    if (title.trim() === "" || description.trim() === "") {
      setShowWarningModal(true);
      return;
    }

    const updatedPost = {
      ...post,
      title,
      description,
    };

    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPosts = savedPosts.map((p) =>
      p.id === post.id ? updatedPost : p
    );

    localStorage.setItem("posts", JSON.stringify(newPosts));

    navigate(`/postDetails/${post.id}`, { state: updatedPost });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={styles["search-bar"]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Search movies..."
              className={styles["search-input"]}
            />
            <button className={styles["search-btn"]}>
              <i className="fas fa-search"></i>
            </button>
          </motion.div>
        </motion.div>

        <motion.h1
          className={styles["post-title-main"]}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Edit Post
        </motion.h1>

        <motion.div className={styles["post-container"]}>
          <motion.div
            className={styles["post-movie"]}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <img
              src={moviePoster}
              alt="movie"
              className={styles["post-poster"]}
            />
            <div className={styles["post-info"]}>
              <div className={styles["post-movie-title"]}>The Last of Us</div>
              <div className={styles["post-director"]}>
                Directed by Neil Druckmann
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles["post-card"]}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className={styles["post-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
              <span className={styles["user-name"]}>{post.username}</span>
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

export default EditPostPage;
