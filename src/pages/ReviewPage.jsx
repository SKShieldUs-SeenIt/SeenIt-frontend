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
  const [editingStars, setEditingStars] = useState(0);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editReviewId, setEditReviewId] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showEditWarningModal, setShowEditWarningModal] = useState(false);

  const initialReviews = [
    {
      id: 1,
      username: "User Name",
      stars: 4.5,
      description: "Review Description...",
      createdAt: "2024-01-01 12:00",
      isEditable: false,
    },
    {
      id: 2,
      username: "User Name",
      stars: 3,
      description: "Another review...",
      createdAt: "2024-01-02 13:00",
      isEditable: false,
    },
    {
      id: 3,
      username: "User Name",
      stars: 5,
      description: "Loved it!",
      createdAt: "2024-01-03 14:00",
      isEditable: false,
    },
    {
      id: 4,
      username: "User Name",
      stars: 3,
      description: "It was okay.",
      createdAt: "2024-01-04 15:00",
      isEditable: false,
    },
    {
      id: 5,
      username: "User Name",
      stars: 4,
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

    if (editingReviewId != null) {
      setNewReviews((prev) =>
        prev.map((r) =>
          r.id === editingReviewId
            ? {
                ...r,
                description: reviewText,
                stars: selectedStars,
                createdAt: new Date().toLocaleString(),
              }
            : r
        )
      );
    } else {
      const newReview = {
        id: Date.now(),
        username: "User Name",
        stars: selectedStars,
        description: reviewText,
        createdAt: new Date().toLocaleString(),
        isEditable: true,
      };
      setNewReviews((prev) => [newReview, ...prev]);
    }

    setReviewText("");
    setSelectedStars(0);
    setShowReviewBox(false);
    setEditingReviewId(null);
    setEditingText("");
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
    setReviewText("");
    setSelectedStars(0);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedReviewId(null);
  };

  const handleEdit = (review) => {
    setEditingReviewId(review.id);
    setEditingText(review.description);
    setEditingStars(review.stars);
  };

  const handleSaveEdit = () => {
    setNewReviews((prev) =>
      prev.map((r) =>
        r.id === editingReviewId
          ? {
              ...r,
              description: editingText,
              stars: editingStars,
              createdAt: new Date().toLocaleString(),
            }
          : r
      )
    );
    setEditingReviewId(null);
    setEditingText("");
    setEditingStars(0);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingText("");
  };

  const allReviews = [...newReviews, ...initialReviews];

  const [selectedStars, setSelectedStars] = useState(0);

  const renderStarSelector = (value, onChange) => {
    return (
      <div className={styles["star-selector"]} style={{ userSelect: "none" }}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = value >= star;
          const isHalf = value >= star - 0.5 && value < star;

          return (
            <span
              key={star}
              style={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "50%",
                  height: "100%",
                  zIndex: 2,
                }}
                onClick={() => onChange(star - 0.5)}
              />
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  width: "50%",
                  height: "100%",
                  zIndex: 2,
                }}
                onClick={() => onChange(star)}
              />
              <span style={{ pointerEvents: "none", color: "#f5c518" }}>
                {isFull ? (
                  <i className="fas fa-star" />
                ) : isHalf ? (
                  <i className="fas fa-star-half-alt" />
                ) : (
                  <i className="far fa-star" />
                )}
              </span>
            </span>
          );
        })}
      </div>
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i
          key={`full-${i}`}
          className="fas fa-star"
          style={{ color: "#f5c518" }}
        ></i>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          className="fas fa-star-half-alt"
          style={{ color: "#f5c518" }}
        ></i>
      );
    }
    while (stars.length < 5) {
      stars.push(
        <i
          key={`empty-${stars.length}`}
          className="far fa-star"
          style={{ color: "#f5c518" }}
        ></i>
      );
    }
    return stars;
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
                onClick={() => {
                  if (editingReviewId !== null) {
                    setShowEditWarningModal(true);
                  } else {
                    setShowReviewBox(true);
                  }
                }}
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
              {renderStarSelector(selectedStars, setSelectedStars)}
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

                {review.isEditable && editingReviewId !== review.id && (
                  <div className={styles["review-actions"]}>
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
                  </div>
                )}
              </div>

              {/* ✅ 편집 중일 때는 수정 UI 보여줌 */}
              {editingReviewId === review.id ? (
                <>
                  <div className={styles["review-stars"]}>
                    {/* 별점 선택 UI */}
                    {renderStarSelector(editingStars, setEditingStars)}
                  </div>
                  <textarea
                    className={styles["review-textarea"]}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div className={styles["review-actions"]}>
                    <button
                      className={`${styles.btn} ${styles.save}`}
                      onClick={handleSaveEdit}
                    >
                      save
                    </button>
                    <button
                      className={`${styles.btn} ${styles.cancel}`}
                      onClick={handleCancelEdit}
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles["review-stars"]}>
                    {renderStars(review.stars)}
                  </div>
                  <div className={styles["review-desc"]}>
                    {review.description}
                  </div>
                  <div className={styles["review-footer"]}>
                    <div className={styles["review-date"]}>
                      {review.createdAt}
                    </div>
                  </div>
                </>
              )}
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

        {showEditWarningModal && (
          <div className={styles["modal-overlay"]}>
            <motion.div
              className={styles["modal-content"]}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className={styles["modal-close-btn"]}
                onClick={() => setShowEditWarningModal(false)}
              >
                ×
              </button>
              <p>수정 중인 리뷰가 있습니다. 먼저 저장하거나 취소해주세요.</p>
              <div className={styles["modal-buttons"]}>
                <button
                  className={`${styles.btn} ${styles.confirm}`}
                  onClick={() => setShowEditWarningModal(false)}
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
