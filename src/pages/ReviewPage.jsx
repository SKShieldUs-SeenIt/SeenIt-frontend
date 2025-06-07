import styles from "./ReviewPage.module.css";
import moviePoster from "../assets/movie.jpg";
import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../actions/reviewAction";
import { fetchUserInfo } from "../actions/userAction";
import WarningModal from "../components/modal/WarningModal";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";

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
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [showEditWarningModal, setShowEditWarningModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const dispatch = useDispatch();
  const reviewsFromRedux = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.user.user);

  const memoizedReviews = useMemo(() => reviewsFromRedux, [reviewsFromRedux]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!id) return;

    axios.get(`/api/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleSubmit = () => {
    if (selectedStars === 0) {
      setWarningMessage("별점을 선택해주세요.");
      setShowWarningModal(true);
      return;
    }

    if (editingReviewId != null) {
      dispatch(updateReview(editingReviewId, reviewText, selectedStars));
    } else {
      dispatch(addReview(id, reviewText, selectedStars)); // ⭐ id는 movieId
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
    if (selectedReviewId) {
      dispatch(deleteReview(selectedReviewId));
    }
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
    setEditingText(review.content);
    setEditingStars(review.rating);
    setReviewText(review.content);
    setSelectedStars(review.rating);
  };

  const handleSaveEdit = () => {
    if (editingStars === 0) {
      setWarningMessage("별점을 입력해주세요.");
      setShowWarningModal(true);
      return;
    }

    if (editingText.trim().length < 10) {
      setWarningMessage("리뷰는 최소 10자 이상 입력해주세요.");
      setShowWarningModal(true);
      return;
    }

    dispatch(updateReview(editingReviewId, editingText, editingStars)).then(
      () => {
        setShowSuccessModal(true);
      }
    );

    setEditingReviewId(null);
    setEditingText("");
    setEditingStars(0);
    setReviewText("");
    setSelectedStars(0);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingText("");
  };

  const allReviews = [...memoizedReviews, ...newReviews];

  const [selectedStars, setSelectedStars] = useState(0);
  if (!user) return <div>로딩 중...</div>;
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
        <CommonHeader title="Reviews" />
        <motion.div className={styles["review-container"]}>
          {movie && (
            <CommonMovieInfo
              title={movie.title}
              director={movie.releaseDate || "Unknown"}
              poster={
                movie.posterPath
                  ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                  : moviePoster
              }
            />
          )}

          {/* Write Review Button */}
          {!showReviewBox && (
            <div className={styles["write-review-button-container"]}>
              <motion.button
                className={`${styles.btn} ${styles["write-review"]}`}
                onClick={() => {
                  const alreadyReviewed = memoizedReviews.some(
                    (r) => r.username === user.name
                  );

                  if (alreadyReviewed) {
                    setWarningMessage("이미 리뷰를 작성했습니다.");
                    setShowWarningModal(true);
                    return;
                  }

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
                <i
                  className="fas fa-pencil-alt"
                  title="리뷰 작성"
                  style={{ fontSize: "1.2rem", cursor: "pointer" }}
                ></i>
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
                  <span className={styles["review-username"]}>{user.name}</span>
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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

                  {review.userId === user.userId &&
                    editingReviewId !== review.id && (
                      <div className={styles["review-actions"]}>
                        <button
                          className={`${styles.btn} ${styles.edit}`}
                          onClick={() => handleEdit(review)}
                        >
                          edit
                        </button>
                        <span className={styles.divider}>|</span>
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
                    <div className={styles["review-actions2"]}>
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
                      {renderStars(review.rating)}
                    </div>
                    <div className={styles["review-desc"]}>
                      {review.content}
                    </div>
                    <div className={styles["review-footer"]}>
                      <div className={styles["review-date"]}>
                        {review.updatedAt
                          ? `수정됨: ${review.updatedAt}`
                          : `작성일: ${review.createdAt}`}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
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
          <WarningModal
            message={warningMessage}
            onClose={() => setShowWarningModal(false)}
          />
        )}

        {showEditWarningModal && (
          <WarningModal
            message="수정 중인 리뷰가 있습니다. 먼저 저장하거나 취소해주세요."
            onClose={() => setShowEditWarningModal(false)}
          />
        )}

        {showSuccessModal && (
          <WarningModal
            message="리뷰가 수정되었습니다!"
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </div>
    </motion.div>
  );
}

export default ReviewPage;
