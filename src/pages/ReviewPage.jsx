import styles from "./ReviewPage.module.css";
import moviePoster from "../assets/movie.jpg";
import React, { useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ReviewPage() {
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [newReviews, setNewReviews] = useState([]);

  const initialReviews = [
    { id: 1, username: "User Name", stars: "★★★★☆", description: "Review Description...", createdAt: "2024-01-01 12:00" },
    { id: 2, username: "User Name", stars: "★★★☆☆", description: "Another review...", createdAt: "2024-01-02 13:00" },
    { id: 3, username: "User Name", stars: "★★★★★", description: "Loved it!", createdAt: "2024-01-03 14:00" },
    { id: 4, username: "User Name", stars: "★★★☆☆", description: "It was okay.", createdAt: "2024-01-04 15:00" },
    { id: 5, username: "User Name", stars: "★★★★☆", description: "Pretty good!", createdAt: "2024-01-05 16:00" },
  ];

  const handleSubmit = () => {
    if (!reviewText.trim()) return;

    const newReview = {
      id: Date.now(),
      username: "User Name",
      stars: "★★★★☆",
      description: reviewText,
      createdAt: new Date().toLocaleString(),
    };

    setNewReviews((prev) => [newReview, ...prev]);
    setReviewText("");
    setShowReviewBox(false);
  };

  const allReviews = [...newReviews, ...initialReviews];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        {/* Header */}
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

        {/* Title */}
        <motion.h1
          className={styles["review-title"]}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Reviews
        </motion.h1>

        {/* Review Container */}
        <motion.div
          className={styles["review-container"]}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Movie Info */}
          <motion.div
            className={styles["review-movie"]}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <img
              src={moviePoster}
              alt="movie"
              className={styles["review-poster"]}
            />
            <div className={styles["review-info"]}>
              <div className={styles["review-movie-title"]}>
                The Last of Us
              </div>
              <div className={styles["review-director"]}>
                Directed by Neil Druckmann
              </div>
            </div>
          </motion.div>

          {/* Write Review Button */}
          {!showReviewBox && (
            <div className={styles["write-review-button-container"]}>
              <motion.button
                className={`${styles.btn} ${styles["write-review"]}`}
                onClick={() => setShowReviewBox(true)}
                initial={{ y: -10, scale: 0.8, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                Write Review
              </motion.button>
            </div>
          )}

          {/* Review Input Box */}
          {showReviewBox && (
            <motion.div
              className={styles["review-box"]}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles["review-user"]}>
                <div className={styles["user-info"]}>
                  <i className="fas fa-user-circle" />
                  <span className={styles["review-username"]}>User Name</span>
                </div>
              </div>
              <div className={styles["review-stars"]}>★★★★☆</div>
              <textarea
                className={styles["review-textarea"]}
                placeholder="Review Description..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              <div className={styles["review-buttons"]}>
                <button
                  className={`${styles.btn} ${styles.cancel}`}
                  onClick={() => setShowReviewBox(false)}
                >
                  cancel
                </button>
                <button
                  className={`${styles.btn} ${styles.submit}`}
                  onClick={handleSubmit}
                >
                  submit
                </button>
              </div>
            </motion.div>
          )}

          {/* Review List */}
          {allReviews.map((review, index) => (
            <motion.div
              key={review.id}
              className={styles["review-list-item"]}
              variants={itemVariants}
            >
              <div className={styles["review-user"]}>
                <div className={styles["user-info"]}>
                  <i className="fas fa-user-circle" />
                  <span className={styles["review-username"]}>
                    {review.username}
                  </span>
                </div>
                {index === 0 && (
                  <div className={styles["review-actions"]}>
                    <button className={`${styles.btn} ${styles.edit}`}>
                      edit
                    </button>
                    <button className={`${styles.btn} ${styles.delete}`}>
                      delete
                    </button>
                  </div>
                )}
              </div>
              <div className={styles["review-stars"]}>{review.stars}</div>
              <div className={styles["review-desc"]}>
                {review.description}
              </div>
              <div className={styles["review-footer"]}>
                <div className={styles["review-date"]}>{review.createdAt}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ReviewPage;
