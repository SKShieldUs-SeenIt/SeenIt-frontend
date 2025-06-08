import styles from "./PostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../actions/postAction";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { fetchPostsByContent } from "../actions/postAction";

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function PostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const contentType = location.state?.contentType;
  const contentId = location.state?.contentId;

  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.user.user);

  const [movie, setMovie] = useState(null);

  const sortedPosts = posts.slice().sort((a, b) => {
    if (!user || !a.user || !b.user) return 0;
    if (a.user.userId === user.userId && b.user.userId !== user.userId)
      return -1;
    if (a.user.userId !== user.userId && b.user.userId === user.userId)
      return 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  useEffect(() => {
    if (!contentType || !contentId) return;

    if (contentType === "MOVIE") {
      axios
        .get(`/api/movies/${contentId}`)
        .then((res) => {
          setMovie(res.data);
        })
        .catch((err) => {
          console.error("❌ 영화 불러오기 실패:", err);
        });
    }
  }, [contentType, contentId]);

  useEffect(() => {
    if (contentType && contentId) {
      dispatch(fetchPostsByContent(contentType, contentId));
    } else {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, contentType, contentId]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader title="Posts" />
        <motion.div className={styles["post-container"]}>
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

          <div className={styles["write-post-container"]}>
            <Tippy
              content="게시글 작성"
              placement="top"
              animation="shift-away"
              arrow={true}
              asChild
            >
              <motion.button
                className={`${styles.btn} ${styles.writePosts}`}
                onClick={() =>
                  navigate("/writePosts", {
                    state: {
                      contentId: contentId,
                      contentType: contentType,
                    },
                  })
                }
                initial={{ y: -30, scale: 0.8, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <i
                  className="fa-solid fa-pencil"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </motion.button>
            </Tippy>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedPosts.map((post) => (
              <motion.div
                key={post.id}
                className={styles["post-list-item"]}
                variants={itemVariants}
                onClick={() => navigate(`/posts/${post.code}`)}
              >
                <div className={styles["post-user"]}>
                  <div className={styles["user-info"]}>
                    <i
                      className={`fas fa-user-circle ${styles["user-icon"]}`}
                    ></i>
                    <span className={styles["post-username"]}>
                      {post.user.name}
                    </span>
                  </div>
                </div>
                <div className={styles["post-title"]}>{post.title}</div>
                <div className={styles["post-desc"]}>{post.body}</div>
                <div className={styles["post-footer"]}>
                  <div className={styles["post-date"]}>{post.createdAt}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PostPage;
