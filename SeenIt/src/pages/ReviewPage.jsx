import "./ReviewPage.css";
import moviePoster from "../assets/movie.jpg";
import React, { useState } from "react";

function ReviewPage() {
  const [showReviewBox, setShowReviewBox] = useState(false);

  return (
    <div>
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
          />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <h1 className="review-title">Reviews</h1>

      <div className="review-container">
        <div className="review-movie">
          <img src={moviePoster} alt="movie" className="review-poster" />
          <div className="review-info">
            <div className="review-movie-title">The Last of Us</div>
            <div className="review-director">Directed by Neil Druckmann</div>
          </div>
        </div>

        {/* 👉 Write Review 버튼 */}
        {!showReviewBox && (
          <div className="write-review-button-container">
            <button
              className="btn write-review"
              onClick={() => setShowReviewBox(true)}
            >
              Write Review
            </button>
          </div>
        )}

        {/* 👉 리뷰 박스 */}
        {showReviewBox && (
          <div className="review-box">
            <div className="review-user">
              <div className="user-info">
                <i className="fas fa-user-circle user-icon"></i>
                <span className="review-username">User Name</span>
              </div>
            </div>
            <div className="review-stars">★★★★☆</div>
            <textarea
              className="review-textarea"
              placeholder="Review Description..."
            ></textarea>
            <div className="review-buttons">
              <button
                className="btn cancel"
                onClick={() => setShowReviewBox(false)}
              >
                cancel
              </button>
              <button className="btn submit">submit</button>
            </div>
          </div>
        )}

        {[1, 2].map((item, index) => (
          <div key={index} className="review-list-item">
            <div className="review-user">
              <div className="user-info">
                <i className="fas fa-user-circle user-icon"></i>
                <span className="review-username">User Name</span>
              </div>
              {index === 0 && (
                <div className="review-actions">
                  <button className="btn edit">edit</button>
                  <button className="btn delete">delete</button>
                </div>
              )}
            </div>
            <div className="review-stars">★★★★☆</div>
            <div className="review-desc">Review Description...</div>
            <div className="review-footer">
              <div className="review-date">createdAt</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
