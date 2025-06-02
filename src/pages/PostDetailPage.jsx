import styles from "./PostDetailPage.module.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const replyItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function PostDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const confirmDelete = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = savedPosts.filter((p) => p.id !== post.id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setShowDeleteModal(false);
    navigate("/posts"); // 삭제 후 목록으로
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
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
          className={styles["post-detail-title"]}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Post Detail
        </motion.h1>

        <motion.div
          className={styles["post-detail-container"]}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <div className={styles["post-buttons"]}>
            <button
              className={styles["btn-edit"]}
              onClick={() => navigate(`/editPost/${post.id}`, { state: post })}
            >
              edit
            </button>
            <button
              className={styles["btn-delete"]}
              onClick={() => setShowDeleteModal(true)}
            >
              delete
            </button>
          </div>
          <div className={styles["post-header"]}>
            <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
            <span className={styles["user-name"]}>{post.username}</span>
          </div>

          <div className={styles["post-content"]}>
            <div className={styles["post-main-title"]}>{post.title}</div>
            <div className={styles["created-at"]}>{post.createdAt}</div>
            <div className={styles["post-description"]}>{post.description}</div>
          </div>

          {/* 댓글 영역 (예시 댓글 하드코딩) */}
          <motion.div
            className={styles["reply-section"]}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[0, 1, 2].map((_, index) => (
              <motion.div
                key={index}
                className={styles["reply-card"]}
                variants={replyItemVariants}
              >
                <div className={styles["reply-header"]}>
                  <i
                    className={`fas fa-user-circle ${styles["user-icon"]}`}
                  ></i>
                  <span className={styles["user-name"]}>User Name</span>
                  {index === 0 && (
                    <div className={styles["reply-buttons"]}>
                      <button className={styles["btn-edit"]}>edit</button>
                      <button className={styles["btn-delete"]}>delete</button>
                    </div>
                  )}
                </div>
                <div className={styles["reply-description"]}>
                  Reply description...
                </div>

                {index === 0 && (
                  <div className={styles["sub-reply"]}>
                    <i
                      className={`fas fa-level-up-alt fa-rotate-90 ${styles["reply-arrow"]}`}
                    ></i>
                    <div
                      className={`${styles["reply-card"]} ${styles["nested"]}`}
                    >
                      <div className={styles["reply-header"]}>
                        <i
                          className={`fas fa-user-circle ${styles["user-icon"]}`}
                        ></i>
                        <span className={styles["user-name"]}>User Name</span>
                      </div>
                      <div className={styles["reply-description"]}>
                        Sub-reply description...
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {showDeleteModal && (
              <div className={styles["modal-overlay"]}>
                <motion.div
                  className={styles["modal-content"]}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className={styles["modal-close-btn"]}
                    onClick={cancelDelete}
                  >
                    ×
                  </button>
                  <p>정말로 이 게시글을 삭제하시겠습니까?</p>
                  <div className={styles["modal-buttons"]}>
                    <button
                      className={`${styles.btn} ${styles.confirm}`}
                      onClick={confirmDelete}
                    >
                      Yes
                    </button>
                    <button
                      className={`${styles.btn} ${styles.cancel}`}
                      onClick={cancelDelete}
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PostDetailPage;
