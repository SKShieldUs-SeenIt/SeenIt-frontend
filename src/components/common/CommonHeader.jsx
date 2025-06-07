import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./CommonHeader.module.css";

export default function CommonHeader({ title }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home"); // 홈 경로로 이동
  };

  return (
    <>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          className={styles["home-btn"]}
          onClick={handleGoHome}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <i className="fas fa-house"></i>
        </motion.button>
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
