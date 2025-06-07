import styles from "./PostDetailPage.module.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteModal from "../components/modal/DeleteModal";
import WarningModal from "../components/modal/WarningModal";
import CommonHeader from "../components/common/CommonHeader";
import { fetchPostByCode } from "../actions/postAction";
import { deletePost } from "../actions/postAction";
import { useSelector } from "react-redux";
import { fetchUserInfo } from "../actions/userAction";
import { fetchCommentsByPost } from "../actions/commentAction";
import CommentSection from "../components/comment/Comment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

function PostDetailPage() {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [showReplyDeleteModal, setShowReplyDeleteModal] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const [selectedSubReply, setSelectedSubReply] = useState({
    parentId: null,
    subReplyId: null,
  });
  const [showSubReplyDeleteModal, setShowSubReplyDeleteModal] = useState(false);
  const [showEmptyReplyModal, setShowEmptyReplyModal] = useState(false);

  const { code } = useParams();
  const postCode = code;
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);

  const user = useSelector((state) => state.user.user);
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPostByCode(code))
      .then((data) => setPost(data))
      .catch((err) => console.error("게시글 로딩 실패", err));
  }, [dispatch, code]);

  useEffect(() => {
    if (postCode) {
      dispatch(fetchCommentsByPost(postCode));
    }
  }, [dispatch, postCode]);

  const confirmDelete = async () => {
    try {
      await dispatch(deletePost(code));
      navigate("/posts", {
        state: { contentId: post.contentId, contentType: post.contentType },
      });
    } catch (err) {
      console.error("게시글 삭제 실패!", err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSubmitReply = () => {
    if (!newReply.trim()) {
      setShowEmptyReplyModal(true);
      return;
    }

    const newReplyObj = {
      id: Date.now(),
      content: newReply,
      username: "User Name",
    };

    const updatedReplies = [...replies, newReplyObj];
    setReplies(updatedReplies);
    localStorage.setItem(`replies-${post.id}`, JSON.stringify(updatedReplies));

    setNewReply("");
    setShowReplyInput(false);
  };

  const handleConfirmReplyDelete = () => {
    const updatedReplies = replies.filter((r) => r.id !== selectedReplyId);
    setReplies(updatedReplies);
    localStorage.setItem(`replies-${post.id}`, JSON.stringify(updatedReplies));
    setShowReplyDeleteModal(false);
    setSelectedReplyId(null);
  };

  const confirmDeleteSubReply = () => {
    const { parentId, subReplyId } = selectedSubReply;
    const updatedReplies = replies.map((r) => {
      if (r.id === parentId) {
        return {
          ...r,
          replies: r.replies.filter((s) => s.id !== subReplyId),
        };
      }
      return r;
    });

    setReplies(updatedReplies);
    localStorage.setItem(`replies-${post.id}`, JSON.stringify(updatedReplies));
    setShowSubReplyDeleteModal(false);
    setSelectedSubReply({ parentId: null, subReplyId: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div>
        <CommonHeader title="Post Detail" />

        <motion.div
          className={styles["back-to-list-wrapper"]}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            className={styles["back-to-list-btn"]}
            onClick={() => navigate("/posts")}
          >
            Back to Posts
          </button>
        </motion.div>

        <motion.div
          className={styles["post-detail-container"]}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          {post?.user.userId === user?.userId && (
            <div className={styles["post-buttons"]}>
              <Tippy content="수정하기">
                <button
                  className={`${styles.btn} ${styles.edit}`}
                  onClick={() =>
                    navigate(`/editPost/${post.code}`, { state: post })
                  }
                >
                  <i className="fas fa-pen-to-square" />
                </button>
              </Tippy>

              <span className={styles.divider}>|</span>

              <Tippy content="삭제하기">
                <button
                  className={`${styles.btn} ${styles.delete}`}
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i className="fas fa-trash" />
                </button>
              </Tippy>
            </div>
          )}
          {post && (
            <>
              <div className={styles["post-header"]}>
                <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
                <span className={styles["user-name"]}>{post.user?.name}</span>
              </div>

              <div className={styles["post-content"]}>
                <div className={styles["post-main-title"]}>{post.title}</div>
                <div className={styles["created-at"]}>{post.createdAt}</div>
                <div className={styles["post-description"]}>{post.body}</div>
              </div>
            </>
          )}

          {!showReplyInput && (
            <Tippy content="댓글 작성">
              <button
                className={styles["write-reply-btn"]}
                onClick={() => setShowReplyInput(true)}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
            </Tippy>
          )}

          <CommentSection
            comments={comments}
            postCode={code}
            showReplyInput={showReplyInput}
            setShowReplyInput={setShowReplyInput}
          />

          {/* 댓글 영역 (예시 댓글 하드코딩) */}
          <motion.div
            className={styles["reply-section"]}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {showDeleteModal && (
              <DeleteModal
                message="게시글을 삭제하시겠습니까?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            )}

            {showReplyDeleteModal && (
              <DeleteModal
                message="댓글을 삭제하시겠습니까?"
                onConfirm={handleConfirmReplyDelete}
                onCancel={() => {
                  setShowReplyDeleteModal(false);
                  setSelectedReplyId(null);
                }}
              />
            )}

            {showSubReplyDeleteModal && (
              <DeleteModal
                message="댓글을 삭제하시겠습니까?"
                onConfirm={confirmDeleteSubReply}
                onCancel={() => {
                  setShowSubReplyDeleteModal(false);
                  setSelectedSubReply({ parentId: null, subReplyId: null });
                }}
              />
            )}

            {showEmptyReplyModal && (
              <WarningModal
                message="댓글을 입력해주세요."
                onClose={() => setShowEmptyReplyModal(false)}
              />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PostDetailPage;
