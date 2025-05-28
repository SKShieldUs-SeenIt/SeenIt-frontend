import "./PostPage.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate } from 'react-router-dom'

function PostPage() {
  const navigate = useNavigate()

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

        <div className="write-post-container">
          <button className="btn writePosts" onClick={() => navigate('/writePosts')}>Write Post</button>
        </div>

        {[1, 2].map((item, index) => (
          <div key={index} className="post-list-item" onClick={() => navigate(`/postDetails`)}>
            <div className="post-user">
              <div className="user-info">
                <i className="fas fa-user-circle user-icon"></i>
                <span className="post-username">User Name</span>
              </div>
              {/* {index === 0 && (
                <div className="post-actions">
                  <button className="btn edit">edit</button>
                  <button className="btn delete">delete</button>
                </div>
              )} */}
            </div>
            <div className="post-title">Post Title</div>
            <div className="post-desc">Post Description...</div>
            <div className="post-footer">
              <div className="post-date">createdAt</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
