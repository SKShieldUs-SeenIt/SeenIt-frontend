import { motion } from "framer-motion";
import styles from "./WarningModal.module.css"; // 공통 스타일

function Modal({ message, onClose }) {
  return (
    <div className={styles["modal-overlay"]}>
      <motion.div
        className={styles["modal-content"]}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className={styles["modal-close-btn"]}
          onClick={onClose}
        >
          ×
        </button>
        <p>{message}</p>
        <div className={styles["modal-buttons"]}>
          <button
            className={`${styles.btn} ${styles.confirm}`}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Modal;