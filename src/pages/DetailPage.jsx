import React, { useEffect, useState } from "react";
import styles from "./DetailPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import CommonHeader from "../components/common/CommonHeader";

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/movies/tmdb/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) =>
        console.error("영화 정보를 불러오는 데 실패했어요!", err)
      );
  }, [id]);

  if (!movie) return <div>로딩 중...</div>;

  const commonMotion = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay: 0.4, duration: 0.5 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader />

        <div className={styles.wrapper}>
          <div className={styles["left-section"]}>
            <motion.div
              className={styles["poster-title-row"]}
              {...commonMotion}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                className={styles.poster}
              />
              <div className={styles["title-block"]}>
                {/* <div className={styles['movie-title']}>The Last of Us (ID: {id})</div> */}
                <div className={styles["movie-title"]}>{movie.title}</div>
                <div className={styles["director-name"]}>
                  <span><i className="fas fa-film"></i>&nbsp;&nbsp;</span>{movie.releaseDate}
                </div>
              </div>
            </motion.div>

            <motion.h1 className={styles["desc-title"]} {...commonMotion}>
              줄거리
            </motion.h1>

            <motion.div className={styles["movie-desc"]} {...commonMotion}>
              {movie.overview}
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
                className={`${styles.btn} ${styles["btn-action"]}`}
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
                className={`${styles.btn} ${styles["btn-action"]}`}
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
