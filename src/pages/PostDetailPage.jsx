import styles from "./PostDetailPage.module.css";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4, // 댓글 전체의 시작 타이밍을 늦춤
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
          Posts
        </motion.h1>

        <motion.div
          className={styles["post-detail-container"]}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <div className={styles["post-buttons"]}>
            <button className={styles["btn-edit"]}>edit</button>
            <button className={styles["btn-delete"]}>delete</button>
          </div>
          <div className={styles["post-header"]}>
            <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
            <span className={styles["user-name"]}>User Name</span>
          </div>

          <div className={styles["post-content"]}>
            <div className={styles["post-main-title"]}>Post Title</div>
            <div className={styles["created-at"]}>createdAt</div>
            <div className={styles["post-description"]}>
              Post Description...
            </div>
          </div>

          {/* 댓글 영역 */}
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

                {/* 대댓글 (sub-reply) */}
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
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PostDetailPage;
