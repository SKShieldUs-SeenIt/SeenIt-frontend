import styles from "./ReviewPage.module.css";
import moviePoster from "../assets/movie.jpg";
import React, { useState } from "react";

function ReviewPage() {
  const [showReviewBox, setShowReviewBox] = useState(false);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles["search-bar"]}>
          <input
            type="text"
            placeholder="Search movies..."
            className={styles["search-input"]}
          />
          <button className={styles["search-btn"]}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <h1 className={styles["review-title"]}>Reviews</h1>

      <div className={styles["review-container"]}>
        <div className={styles["review-movie"]}>
          <img src={moviePoster} alt="movie" className={styles["review-poster"]} />
          <div className={styles["review-info"]}>
            <div className={styles["review-movie-title"]}>The Last of Us</div>
            <div className={styles["review-director"]}>Directed by Neil Druckmann</div>
          </div>
        </div>

        {!showReviewBox && (
          <div className={styles["write-review-button-container"]}>
            <button
              className={`${styles.btn} ${styles["write-review"]}`}
              onClick={() => setShowReviewBox(true)}
            >
              Write Review
            </button>
          </div>
        )}

        {showReviewBox && (
          <div className={styles["review-box"]}>
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
            ></textarea>
            <div className={styles["review-buttons"]}>
              <button
                className={`${styles.btn} ${styles.cancel}`}
                onClick={() => setShowReviewBox(false)}
              >
                cancel
              </button>
              <button className={`${styles.btn} ${styles.submit}`}>submit</button>
            </div>
          </div>
        )}

        {[1, 2].map((item, index) => (
          <div key={index} className={styles["review-list-item"]}>
            <div className={styles["review-user"]}>
              <div className={styles["user-info"]}>
                <i className="fas fa-user-circle" />
                <span className={styles["review-username"]}>User Name</span>
              </div>
              {index === 0 && (
                <div className={styles["review-actions"]}>
                  <button className={`${styles.btn} ${styles.edit}`}>edit</button>
                  <button className={`${styles.btn} ${styles.delete}`}>delete</button>
                </div>
              )}
            </div>
            <div className={styles["review-stars"]}>★★★★☆</div>
            <div className={styles["review-desc"]}>Review Description...</div>
            <div className={styles["review-footer"]}>
              <div className={styles["review-date"]}>createdAt</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
