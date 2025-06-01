import styles from "./PostDetailPage.module.css";

function PostDetailPage() {
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

      <h1 className={styles["post-detail-title"]}>Posts</h1>

      <div className={styles["post-detail-container"]}>
        <div className={styles["post-buttons"]}>
          <button className={styles["btn-edit"]}>edit</button>
          <button className={styles["btn-delete"]}>delete</button>
        </div>
        <div className={styles["post-header"]}>
          <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
          <span className={styles["user-name"]}>User Name</span>
        </div>

        <div className={styles["post-content"]}>
          <div className={styles["post-main-title"]}>Post Title</div>
          <div className={styles["created-at"]}>createdAt</div>
          <div className={styles["post-description"]}>Post Description...</div>
        </div>

        {/* 댓글 영역 */}
        <div className={styles["reply-section"]}>
          <div className={styles["reply-card"]}>
            <div className={styles["reply-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
              <span className={styles["user-name"]}>User Name</span>
              <div className={styles["reply-buttons"]}>
                <button className={styles["btn-edit"]}>edit</button>
                <button className={styles["btn-delete"]}>delete</button>
              </div>
            </div>
            <div className={styles["reply-description"]}>Reply description...</div>
          </div>

          {/* 대댓글 */}
          <div className={styles["sub-reply"]}>
            <i className={`fas fa-level-up-alt fa-rotate-90 ${styles["reply-arrow"]}`}></i>
            <div className={`${styles["reply-card"]} ${styles.nested}`}>
              <div className={styles["reply-header"]}>
                <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
                <span className={styles["user-name"]}>User Name</span>
              </div>
              <div className={styles["reply-description"]}>Reply description...</div>
            </div>
          </div>

          {/* 또 다른 댓글 */}
          <div className={styles["reply-card"]}>
            <div className={styles["reply-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
              <span className={styles["user-name"]}>User Name</span>
            </div>
            <div className={styles["reply-description"]}>Reply description...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
