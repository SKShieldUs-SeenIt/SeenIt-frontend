import { motion } from "framer-motion";
import styles from "./CommonMovieInfo.module.css";

export default function CommonMovieInfo({ title, director, poster }) {
  return (
    <motion.div
      className={styles["movie-section"]}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <img src={poster} alt="movie" className={styles["poster"]} />
      <div className={styles["info"]}>
        <div className={styles["movie-title"]}>{title}</div>
        <div className={styles["director"]}>
          <span>
            <i className="fas fa-film"></i>&nbsp;&nbsp;
          </span>
          {director}
        </div>
      </div>
    </motion.div>
  );
}
