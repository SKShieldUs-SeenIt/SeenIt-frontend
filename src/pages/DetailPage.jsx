import React from "react";
import styles from "./DetailPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

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

        <div className={styles.wrapper}>
          <div className={styles["left-section"]}>
            <motion.div
              className={styles["poster-title-row"]}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <img
                src={moviePoster}
                alt="Movie Poster"
                className={styles.poster}
              />
              <div className={styles["title-block"]}>
                {/* <div className={styles['movie-title']}>The Last of Us (ID: {id})</div> */}
                <div className={styles["movie-title"]}>The Last of Us</div>
                <div className={styles["director-name"]}>
                  Directed by Neil Druckmann
                </div>
              </div>
            </motion.div>

            <motion.h1
              className={styles["desc-title"]}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Detail
            </motion.h1>

            <motion.div
              className={styles["movie-desc"]}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Acolle vis laties handyered and lots fo the peplifiamls dee and
              you.
              <br />
              When teeting beting usact the ahony fleationalns unginis on atyns
              ralted to eeteror's aapoital, you the locem and clay oick tosed
              not petting the rate colenorsies.
            </motion.div>
          </div>

          <motion.div
            className={styles["right-section"]}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className={styles["rating-label"]}>Average Star Rating</div>
            <motion.div
              style={{ textAlign: "center" }}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            >
              <div className={styles["rating-score"]}>4.0</div>
              <div className={styles.stars}>★★★★☆</div>
            </motion.div>

            <div className={styles["vote-counts"]}>
              <div>
                Review
                <br />
                <motion.span
                  className={styles.count}
                  initial={{ scale: 2.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 60, delay: 0.8 }}
                >
                  5
                </motion.span>
              </div>
              <div>
                Post
                <br />
                <motion.span
                  className={styles.count}
                  initial={{ scale: 2.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 60, delay: 0.9 }}
                >
                  2
                </motion.span>
              </div>
            </div>

            <div className={styles["button-post"]}>
              <div className={styles["button-label"]}>View Posts</div>
              <motion.button
                className={`${styles.btn} ${styles.post}`}
                whileHover={{ scale: 1.55 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/posts")}
              >
                Go to Posts
              </motion.button>
            </div>

            <div className={styles["button-review"]}>
              <div className={styles["button-label"]}>View Reviews</div>
              <motion.button
                className={`${styles.btn} ${styles.review}`}
                whileHover={{ scale: 1.55 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/reviews")}
              >
                Go to Reviews
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default DetailPage;
