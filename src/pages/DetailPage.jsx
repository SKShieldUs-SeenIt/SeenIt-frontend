import React, { useEffect, useState } from "react";
import styles from "./DetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import CommonHeader from "../components/common/CommonHeader";

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    // 영화 상세 정보 가져오기
    axios.get(`/api/movies/tmdb/${id}`).then((res) => {
      setMovie(res.data);
      setMovieId(res.data.id);
    });
  }, [id]);

  if (!movie) return <div>로딩 중...</div>;

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const halfStar = score % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i
          key={`full-${i}`}
          className="fas fa-star"
          style={{ color: "#FFD700", marginRight: "2px" }}
        ></i>
      );
    }

    if (halfStar) {
      stars.push(
        <i
          key="half"
          className="fas fa-star-half-alt"
          style={{ color: "#FFD700", marginRight: "2px" }}
        ></i>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i
          key={`empty-${i}`}
          className="far fa-star"
          style={{ color: "#FFD700", marginRight: "2px" }}
        ></i>
      );
    }

    return stars;
  };

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
      {movie && (
        <div
          className={styles.backgroundOverlay}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.posterPath})`,
          }}
        />
      )}

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
                  <span>
                    <i className="fas fa-film"></i>&nbsp;&nbsp;
                  </span>
                  {movie.releaseDate}
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
              <div className={styles["rating-score"]}>
                {movie.userAverageRating !== null &&
                movie.userAverageRating !== undefined
                  ? movie.userAverageRating.toFixed(1)
                  : "없음"}
              </div>
              <div className={styles.stars}>
                {movie.userAverageRating
                  ? renderStars(movie.userAverageRating)
                  : "별점 없음"}
              </div>
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
                  {movie.reviewCount}
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
                onClick={() => navigate(`/reviews/${movieId}`)}
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
