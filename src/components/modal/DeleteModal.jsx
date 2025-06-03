// components/ConfirmModal.jsx
import styles from "./DeleteModal.module.css";
import { motion } from "framer-motion";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className={styles["modal-overlay"]}>
      <motion.div
        className={styles["modal-content"]}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button className={styles["modal-close-btn"]} onClick={onCancel}>
          ×
        </button>
        <p>{message}</p>
        <div className={styles["modal-buttons"]}>
          <button className={`${styles.btn} ${styles.confirm}`} onClick={onConfirm}>
            Yes
          </button>
          <button className={`${styles.btn} ${styles.cancel}`} onClick={onCancel}>
            No
          </button>
        </div>
      </motion.div>
    </div>
  );
}
