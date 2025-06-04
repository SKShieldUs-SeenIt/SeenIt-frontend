import { motion } from "framer-motion";
import styles from "./CommonHeader.module.css";

export default function CommonHeader({ title }) {
  return (
    <>
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
        className={styles["page-title"]}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {title}
      </motion.h1>
    </>
  );
}
