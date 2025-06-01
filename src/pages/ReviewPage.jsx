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
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const initialReviews = [
    {
      id: 1,
      username: "User Name",
      stars: "★★★★☆",
      description: "Review Description...",
      createdAt: "2024-01-01 12:00",
      isEditable: false,
    },
    {
      id: 2,
      username: "User Name",
      stars: "★★★☆☆",
      description: "Another review...",
      createdAt: "2024-01-02 13:00",
      isEditable: false,
    },
    {
      id: 3,
      username: "User Name",
      stars: "★★★★★",
      description: "Loved it!",
      createdAt: "2024-01-03 14:00",
      isEditable: false,
    },
    {
      id: 4,
      username: "User Name",
      stars: "★★★☆☆",
      description: "It was okay.",
      createdAt: "2024-01-04 15:00",
      isEditable: false,
    },
    {
      id: 5,
      username: "User Name",
      stars: "★★★★☆",
      description: "Pretty good!",
      createdAt: "2024-01-05 16:00",
      isEditable: false,
    },
  ];

  const handleSubmit = () => {
    if (selectedStars === 0) {
      setShowWarningModal(true);
      return;
    }

    if (isEditing) {
      setNewReviews((prev) =>
        prev.map((r) =>
          r.id === editReviewId
            ? {
                ...r,
                description: reviewText,
                stars:
                  "★".repeat(selectedStars) + "☆".repeat(5 - selectedStars),
                createdAt: new Date().toLocaleString(),
              }
            : r
        )
      );
    } else {
      const newReview = {
        id: Date.now(),
        username: "User Name",
        stars: "★".repeat(selectedStars) + "☆".repeat(5 - selectedStars),
        description: reviewText,
        createdAt: new Date().toLocaleString(),
        isEditable: true,
      };
      setNewReviews((prev) => [newReview, ...prev]);
    }

    // 공통 초기화
    setReviewText("");
    setShowReviewBox(false);
    setIsEditing(false);
    setEditReviewId(null);
  };

  const handleAskDelete = (id) => {
    setSelectedReviewId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setNewReviews((prev) => prev.filter((r) => r.id !== selectedReviewId));
    setShowConfirm(false);
    setSelectedReviewId(null);

    setEditingReviewId(null);
    setEditingText("");
    setEditReviewId(null);
    setReviewText("");
    setSelectedStars(0);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedReviewId(null);
  };

  const handleEdit = (review) => {
    setIsEditing(true);
    setEditReviewId(review.id);
    setShowReviewBox(true);
    setReviewText(review.description);
    setSelectedStars(review.stars.replace(/☆/g, "").length); // ★ 개수 세기
  };

  const handleSaveEdit = (id) => {
    setNewReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              description: editingText,
              createdAt: new Date().toLocaleString(),
            }
          : r
      )
    );
    setEditingReviewId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingText("");
  };

  const allReviews = [...newReviews, ...initialReviews];

  const [selectedStars, setSelectedStars] = useState(0);

  const renderStarSelector = () => {
    return (
      <div className={styles["star-selector"]} style={{ userSelect: "none" }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = selectedStars >= star;
          const isHalf = selectedStars >= star - 0.5 && selectedStars < star;

          return (
            <span
              key={star}
              style={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {/* 왼쪽 반 클릭 영역 */}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "50%",
                  height: "100%",
                  zIndex: 2,
                }}
                onClick={() => setSelectedStars(star - 0.5)}
              />
              {/* 오른쪽 반 클릭 영역 */}
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "50%",
                  height: "100%",
                  zIndex: 2,
                }}
                onClick={() => setSelectedStars(star)}
              />
              {/* 별 렌더링 */}
              <span
                className={`${styles.star} ${
                  isFull ? styles.full : isHalf ? styles.half : ""
                }`}
                style={{ pointerEvents: "none" }}
              >
                ★
              </span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        {/* Header */}
        <motion.div className={styles.header}>
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
              <div className={styles["review-movie-title"]}>The Last of Us</div>
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
                whileHover={{ scale: 1.1 }}
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
              {/* <div className={styles["review-stars"]}>★★★★☆</div> */}
              {renderStarSelector()}
              <textarea
                className={styles["review-textarea"]}
                placeholder="Review Description..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
              <div className={styles["review-buttons"]}>
                <button
                  className={`${styles.btn} ${styles.cancel}`}
                  onClick={() => {
                    setShowReviewBox(false);
                    setReviewText("");
                    setSelectedStars(0);
                    setIsEditing(false);
                    setEditReviewId(null);
                  }}
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
          {allReviews.map((review) => (
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
                {review.isEditable && (
                  <div className={styles["review-actions"]}>
                    {editingReviewId === review.id ? (
                      <>
                        <button
                          className={`${styles.btn} ${styles.save}`}
                          onClick={() => handleSaveEdit(review.id)}
                        >
                          save
                        </button>
                        <button
                          className={`${styles.btn} ${styles.cancel}`}
                          onClick={handleCancelEdit}
                        >
                          cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={`${styles.btn} ${styles.edit}`}
                          onClick={() => handleEdit(review)}
                        >
                          edit
                        </button>
                        <button
                          className={`${styles.btn} ${styles.delete}`}
                          onClick={() => handleAskDelete(review.id)}
                        >
                          delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className={styles["review-stars"]}>{review.stars}</div>
              {editingReviewId === review.id ? (
                <textarea
                  className={styles["review-textarea"]}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <div className={styles["review-desc"]}>
                  {review.description}
                </div>
              )}
              <div className={styles["review-footer"]}>
                <div className={styles["review-date"]}>{review.createdAt}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Delete Confirm Modal */}
        {showConfirm && (
          <div className={styles["modal-overlay"]}>
            <motion.div
              className={styles["modal-content"]}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className={styles["modal-close-btn"]}
                onClick={handleCancelDelete}
              >
                ×
              </button>
              <p>리뷰를 삭제하시겠습니까?</p>
              <div className={styles["modal-buttons"]}>
                <button
                  className={`${styles.btn} ${styles.confirm}`}
                  onClick={handleConfirmDelete}
                >
                  Yes
                </button>
                <button
                  className={`${styles.btn} ${styles.cancel}`}
                  onClick={handleCancelDelete}
                >
                  No
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showWarningModal && (
          <div className={styles["modal-overlay"]}>
            <motion.div
              className={styles["modal-content"]}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className={styles["modal-close-btn"]}
                onClick={() => setShowWarningModal(false)}
              >
                ×
              </button>
              <p>별점을 선택해주세요.</p>
              <div className={styles["modal-buttons"]}>
                <button
                  className={`${styles.btn} ${styles.confirm}`}
                  onClick={() => setShowWarningModal(false)}
                >
                  OK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ReviewPage;
