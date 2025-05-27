// import { useState } from 'react'
import './App.css'
import moviePoster from './assets/movie.jpg'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <div className="header">
        <div className="search-bar">
          <input type="text" placeholder="Search movies..." className="search-input" />
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className="wrapper">
        <div className="left-section">
          <div className="poster-title-row">
            <img src={moviePoster} alt="Movie Poster" className="poster" />
            <div className="title-block">
              <div className="movie-title">The Last of Us</div>
              <div className="director-name">Directed by Neil Druckmann</div>
            </div>
          </div>

          <h1 className="movie-title">Detail</h1>
          <div className="movie-desc">
            Acolle vis laties handyered and lots fo the peplifiamls dee and you.<br />
            When teeting beting usact the ahony fleationalns unginis on atyns
            ralted to eeteror's aapoital, you the locem and clay oick tosed not
            petting the rate colenorsies.
          </div>
        </div>

        <div className="right-section">
          <div className="rating-label">Average Star Rating</div>
          <div className="rating-score">4.0</div>
          <div className="stars">★★★★☆</div>

          <div className="vote-counts">
            <div>Like<br /><span className="count">5</span></div>
            <div>Post<br /><span className="count">2</span></div>
          </div>

          <div className="button-post">
            <div className="button-label">View Posts</div>
            <button className="btn post">Go to Posts</button>
          </div>

          <div className="button-review">
            <div className="button-label">View Reviews</div>
            <button className="btn review">Go to Reviews</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
