import styles from "./WritePostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function WritePostsPage() {
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
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

          <div className={styles["post-card"]}>
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
                <button className={styles["btn-submit"]}>submit</button>
              </div>
            </div>

            <div className={styles["post-body"]}>
              <div className={styles["title-row"]}>
                <div className={styles["title-label"]}>Title:</div>
                <input type="text" className={styles["title-input"]} />
              </div>
              <textarea
                className={styles["description-textarea"]}
                placeholder="Post Description..."
              ></textarea>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default WritePostsPage;
