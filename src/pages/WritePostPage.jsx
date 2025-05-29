import "./WritePostPage.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate } from 'react-router-dom';

function WritePostsPage() {
  const navigate = useNavigate();

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
      <h1 className="post-title-main">Posts</h1>

      <div className="post-container">
        <div className="post-movie">
          <img src={moviePoster} alt="movie" className="post-poster" />
          <div className="post-info">
            <div className="post-movie-title">The Last of Us</div>
            <div className="post-director">Directed by Neil Druckmann</div>
          </div>
        </div>

        <div className="post-card">
          <div className="post-header">
            <i className="fas fa-user-circle user-icon"></i>
            <span className="user-name">User Name</span>
            <div className="post-buttons">
              <button className="btn-cancel" onClick={() => navigate('/posts')}>cancel</button>
              <button className="btn-submit">submit</button>
            </div>
          </div>

          <div className="post-body">
            <div className="title-row">
              <div className="title-label">Title:</div>
              <input type="text" className="title-input" />
            </div>
            <textarea
              className="description-textarea"
              placeholder="Post Description..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WritePostsPage;
