import styles from "./PostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // localStorage.removeItem("posts");
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(savedPosts);
  }, []);

  const postsList = [
    {
      id: 1,
      username: "User 1",
      title: "Post Title 1",
      description: "Description for Post 1",
      createdAt: "2025-06-01",
    },
    {
      id: 2,
      username: "User 2",
      title: "Post Title 2",
      description: "Description for Post 2",
      createdAt: "2025-06-02",
    },
    {
      id: 3,
      username: "User 3",
      title: "Post Title 3",
      description: "Description for Post 3",
      createdAt: "2025-06-03",
    },
    // 추가적으로 더 데이터를 넣을 수 있음
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader title="Posts" />
        <motion.div className={styles["post-container"]}>
          <CommonMovieInfo
            title="The Last of Us"
            director="Neil Druckmann"
            poster={moviePoster}
          />

          <div className={styles["write-post-container"]}>
            <motion.button
              className={`${styles.btn} ${styles.writePosts}`}
              onClick={() => navigate("/writePosts")}
              initial={{ y: -30, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              Write Post
            </motion.button>
          </div>

          {posts.map((post, index) => (
            <motion.div
              key={index}
              className={styles["post-list-item"]}
              variants={itemVariants}
              onClick={() =>
                navigate(`/postDetails/${post.id}`, {
                  state: {
                    id: post.id,
                    username: post.username,
                    title: post.title,
                    description: post.description,
                    createdAt: post.createdAt,
                  },
                })
              }
            >
              <div className={styles["post-user"]}>
                <div className={styles["user-info"]}>
                  <i
                    className={`fas fa-user-circle ${styles["user-icon"]}`}
                  ></i>
                  <span className={styles["post-username"]}>
                    {post.username}
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

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {postsList.map((item) => (
              <motion.div
                key={item.id}
                className={styles["post-list-item"]}
                variants={itemVariants}
                onClick={() =>
                  navigate(`/postDetails/${item.id}`, {
                    state: {
                      id: item.id,
                      username: item.username,
                      title: item.title,
                      description: item.description,
                      createdAt: item.createdAt,
                    },
                  })
                } // 예시로 post ID 추가
              >
                <div className={styles["post-user"]}>
                  <div className={styles["user-info"]}>
                    <i
                      className={`fas fa-user-circle ${styles["user-icon"]}`}
                    ></i>
                    <span className={styles["post-username"]}>
                      {item.username}
                    </span>
                  </div>
                </div>
                <div className={styles["post-title"]}>{item.title}</div>
                <div className={styles["post-desc"]}>{item.description}</div>
                <div className={styles["post-footer"]}>
                  <div className={styles["post-date"]}>{item.createdAt}</div>
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
