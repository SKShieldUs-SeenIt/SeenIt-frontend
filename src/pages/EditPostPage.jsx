import { useState } from "react";
import styles from "./WritePostPage.module.css";
import moviePoster from "../assets/movie.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import WarningModal from "../components/modal/WarningModal";
import CommonHeader from "../components/common/CommonHeader";
import CommonMovieInfo from "../components/common/CommonMovieInfo";

function EditPostPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state;

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [showWarningModal, setShowWarningModal] = useState(false);

  const handleUpdate = () => {
    if (title.trim() === "" || description.trim() === "") {
      setShowWarningModal(true);
      return;
    }

    const updatedPost = {
      ...post,
      title,
      description,
    };

    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPosts = savedPosts.map((p) =>
      p.id === post.id ? updatedPost : p
    );

    localStorage.setItem("posts", JSON.stringify(newPosts));

    navigate(`/postDetails/${post.id}`, { state: updatedPost });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader title="Edit Post" />
        <motion.div className={styles["post-container"]}>
          <CommonMovieInfo
            title="The Last of Us"
            director="Neil Druckmann"
            poster={moviePoster}
          />

          <motion.div
            className={styles["post-card"]}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className={styles["post-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
              <span className={styles["user-name"]}>{post.username}</span>
              <div className={styles["post-buttons"]}>
                <button
                  className={styles["btn-cancel"]}
                  onClick={() => navigate(-1)}
                >
                  cancel
                </button>
                <button className={styles["btn-submit"]} onClick={handleUpdate}>
                  save
                </button>
              </div>
            </div>

            <div className={styles["post-body"]}>
              <div className={styles["title-row"]}>
                <div className={styles["title-label"]}>Title:</div>
                <input
                  type="text"
                  className={styles["title-input"]}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <textarea
                className={styles["description-textarea"]}
                placeholder="Post Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </motion.div>
        </motion.div>

        {showWarningModal && (
          <WarningModal
            message="제목 또는 내용을 입력해주세요."
            onClose={() => setShowWarningModal(false)}
          />
        )}
      </div>
    </motion.div>
  );
}

export default EditPostPage;
