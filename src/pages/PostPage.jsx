import styles from "./PostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function PostPage() {
  const navigate = useNavigate();

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
          Posts
        </motion.h1>

        <motion.div
          className={styles["post-container"]}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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

          <div className={styles["write-post-container"]}>
            <motion.button
              className={`${styles.btn} ${styles.writePosts}`}
              onClick={() => navigate("/writePosts")}
              initial={{ y: -10, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              Write Post
            </motion.button>
          </div>

          {[1, 2, 3, 4, 5].map((item, index) => (
            <motion.div
              key={index}
              className={styles["post-list-item"]}
              variants={itemVariants}
              onClick={() => navigate(`/postDetails`)}
            >
              <div className={styles["post-user"]}>
                <div className={styles["user-info"]}>
                  <i
                    className={`fas fa-user-circle ${styles["user-icon"]}`}
                  ></i>
                  <span className={styles["post-username"]}>User Name</span>
                </div>
              </div>
              <div className={styles["post-title"]}>Post Title</div>
              <div className={styles["post-desc"]}>Post Description...</div>
              <div className={styles["post-footer"]}>
                <div className={styles["post-date"]}>createdAt</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PostPage;
