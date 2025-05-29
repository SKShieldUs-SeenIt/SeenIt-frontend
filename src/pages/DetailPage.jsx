import React from 'react';
import styles from './DetailPage.module.css';
import moviePoster from '../assets/movie.jpg';
import { useNavigate, useParams } from 'react-router-dom';

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <div className={styles.header}>
        <div className={styles['search-bar']}>
          <input
            type="text"
            placeholder="Search movies..."
            className={styles['search-input']}
          />
          <button className={styles['search-btn']}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles['left-section']}>
          <div className={styles['poster-title-row']}>
            <img src={moviePoster} alt="Movie Poster" className={styles.poster} />
            <div className={styles['title-block']}>
              {/* <div className={styles['movie-title']}>The Last of Us (ID: {id})</div> */}
              <div className={styles['movie-title']}>The Last of Us</div>
              <div className={styles['director-name']}>Directed by Neil Druckmann</div>
            </div>
          </div>

          <h1 className={styles['desc-title']}>Detail</h1>
          <div className={styles['movie-desc']}>
            Acolle vis laties handyered and lots fo the peplifiamls dee and you.<br />
            When teeting beting usact the ahony fleationalns unginis on atyns
            ralted to eeteror's aapoital, you the locem and clay oick tosed not
            petting the rate colenorsies.
          </div>
        </div>

        <div className={styles['right-section']}>
          <div className={styles['rating-label']}>Average Star Rating</div>
          <div className={styles['rating-score']}>4.0</div>
          <div className={styles.stars}>★★★★☆</div>

          <div className={styles['vote-counts']}>
            <div>
              Like<br />
              <span className={styles.count}>5</span>
            </div>
            <div>
              Post<br />
              <span className={styles.count}>2</span>
            </div>
          </div>

          <div className={styles['button-post']}>
            <div className={styles['button-label']}>View Posts</div>
            <button
              className={`${styles.btn} ${styles.post}`}
              onClick={() => navigate('/posts')}
            >
              Go to Posts
            </button>
          </div>

          <div className={styles['button-review']}>
            <div className={styles['button-label']}>View Reviews</div>
            <button
              className={`${styles.btn} ${styles.review}`}
              onClick={() => navigate('/reviews')}
            >
              Go to Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
