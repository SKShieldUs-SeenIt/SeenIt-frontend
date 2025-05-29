import "./PostDetailPage.css";

function PostDetailPage() {
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

      <h1 className="post-detail-title">Posts</h1>

      <div className="post-detail-container">
        <div className="post-buttons">
          <button className="btn-edit">edit</button>
          <button className="btn-delete">delete</button>
        </div>
        <div className="post-header">
          <i className="fas fa-user-circle user-icon"></i>
          <span className="user-name">User Name</span>
        </div>

        <div className="post-content">
          <div className="post-main-title">Post Title</div>
          <div className="created-at">createdAt</div>
          <div className="post-description">Post Description...</div>
        </div>

        {/* 댓글 영역 */}
        <div className="reply-section">
          <div className="reply-card">
            <div className="reply-header">
              <i className="fas fa-user-circle user-icon"></i>
              <span className="user-name">User Name</span>
              <div className="reply-buttons">
                <button className="btn-edit">edit</button>
                <button className="btn-delete">delete</button>
              </div>
            </div>
            <div className="reply-description">Reply description...</div>
          </div>

          {/* 대댓글 */}
          <div className="sub-reply">
            <i className="fas fa-level-up-alt fa-rotate-90 reply-arrow"></i>
            <div className="reply-card nested">
              <div className="reply-header">
                <i className="fas fa-user-circle user-icon"></i>
                <span className="user-name">User Name</span>
              </div>
              <div className="reply-description">Reply description...</div>
            </div>
          </div>

          {/* 또 다른 댓글 */}
          <div className="reply-card">
            <div className="reply-header">
              <i className="fas fa-user-circle user-icon"></i>
              <span className="user-name">User Name</span>
            </div>
            <div className="reply-description">Reply description...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
