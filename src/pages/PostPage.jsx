import styles from "./PostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../actions/postAction";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

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
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader title="Posts" />
        <motion.div className={styles["post-container"]}>
          {/* <CommonMovieInfo
            title="The Last of Us"
            director="Neil Druckmann"
            poster={moviePoster}
          /> */}

          <div className={styles["write-post-container"]}>
            <Tippy
              content="게시글 작성"
              placement="top"
              animation="shift-away"
              arrow={true}
            >
              <motion.button
                className={`${styles.btn} ${styles.writePosts}`}
                onClick={() => navigate("/writePosts")}
                initial={{ y: -30, scale: 0.8, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <i
                  className="fas fa-pen-to-square"
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
            {posts.map((post) => (
              <motion.div
                key={post.id}
                className={styles["post-list-item"]}
                variants={itemVariants}
                onClick={() => navigate(`/postDetails/${post.code}`)}
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
                <div className={styles["post-desc"]}>{post.description}</div>
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
