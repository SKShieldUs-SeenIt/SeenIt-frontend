import styles from "./PostDetailPage.module.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DeleteModal from "../components/modal/DeleteModal";
import WarningModal from "../components/modal/WarningModal";
import CommonHeader from "../components/common/CommonHeader";
import { fetchPostByCode } from "../actions/postAction";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
};

const replyItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
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
  const [editReplyId, setEditReplyId] = useState(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  const [activeReplyBox, setActiveReplyBox] = useState(null);
  const [subReplyText, setSubReplyText] = useState("");
  const [editSubReplyId, setEditSubReplyId] = useState(null);
  const [editSubReplyContent, setEditSubReplyContent] = useState("");
  const [editParentReplyId, setEditParentReplyId] = useState(null);
  const [selectedSubReply, setSelectedSubReply] = useState({
    parentId: null,
    subReplyId: null,
  });
  const [showSubReplyDeleteModal, setShowSubReplyDeleteModal] = useState(false);
  const [showEmptyReplyModal, setShowEmptyReplyModal] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPostByCode(id))
      .then((data) => setPost(data))
      .catch((err) => console.error("게시글 로딩 실패", err));
  }, [dispatch, id]);

  const confirmDelete = () => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = savedPosts.filter((p) => p.id !== post.id);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setShowDeleteModal(false);
    navigate("/posts"); // 삭제 후 목록으로
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

  const handleEditClick = (reply) => {
    setEditReplyId(reply.id);
    setEditReplyContent(reply.content);
  };

  const handleSaveEdit = () => {
    setReplies((prev) =>
      prev.map((r) =>
        r.id === editReplyId ? { ...r, content: editReplyContent } : r
      )
    );
    setEditReplyId(null);
    setEditReplyContent("");
  };

  const handleCancelEdit = () => {
    setEditReplyId(null);
    setEditReplyContent("");
  };

  const handleEditSubReplyClick = (parentId, subReply) => {
    setEditParentReplyId(parentId);
    setEditSubReplyId(subReply.id);
    setEditSubReplyContent(subReply.content);
  };

  const handleCancelSubReplyEdit = () => {
    setEditSubReplyId(null);
    setEditParentReplyId(null);
    setEditSubReplyContent("");
  };

  const handleSaveSubReplyEdit = () => {
    const updatedReplies = replies.map((r) => {
      if (r.id === editParentReplyId) {
        const updatedSubReplies = r.replies.map((s) =>
          s.id === editSubReplyId ? { ...s, content: editSubReplyContent } : s
        );
        return { ...r, replies: updatedSubReplies };
      }
      return r;
    });
    setReplies(updatedReplies);
    localStorage.setItem(`replies-${post.id}`, JSON.stringify(updatedReplies));
    setEditSubReplyId(null);
    setEditParentReplyId(null);
    setEditSubReplyContent("");
  };

  const handleDeleteSubReply = (parentId, subReplyId) => {
    setSelectedSubReply({ parentId, subReplyId });
    setShowSubReplyDeleteModal(true);
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
          <div className={styles["post-buttons"]}>
            <button
              className={styles["btn-edit"]}
              onClick={() => navigate(`/editPost/${post.id}`, { state: post })}
            >
              edit
            </button>
            <button
              className={styles["btn-delete"]}
              onClick={() => setShowDeleteModal(true)}
            >
              delete
            </button>
          </div>
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

          {/* 댓글 입력창 토글 버튼 + 입력창 */}
          <div className={styles["reply-header-top"]}>
            {!showReplyInput && (
              <button
                className={styles["write-reply-btn"]}
                onClick={() => setShowReplyInput(true)}
              >
                Write Reply
              </button>
            )}

            {showReplyInput && (
              <motion.div
                className={styles["reply-card"]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles["reply-header"]}>
                  <i
                    className={`fas fa-user-circle ${styles["user-icon"]}`}
                  ></i>
                  <span className={styles["user-name"]}>User Name</span>
                </div>

                <textarea
                  className={styles["reply-description-input"]}
                  placeholder="댓글을 입력하세요..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />

                <div className={styles["reply-btn-group"]}>
                  <button
                    className={styles["submit-reply-btn"]}
                    onClick={handleSubmitReply}
                  >
                    submit
                  </button>
                  <button
                    className={styles["cancel-reply-btn"]}
                    onClick={() => {
                      setShowReplyInput(false);
                      setNewReply("");
                    }}
                  >
                    cancel
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {replies.map((reply) => (
            <motion.div
              key={reply.id}
              className={styles["reply-card"]}
              variants={replyItemVariants}
            >
              <div className={styles["reply-header"]}>
                <i className={`fas fa-user-circle ${styles["user-icon"]}`}></i>
                <span className={styles["user-name"]}>User Name</span>
                {/* 수정 중일 땐 버튼 안 보이게 */}
                {editReplyId !== reply.id && (
                  <div className={styles["reply-buttons"]}>
                    <button
                      className={styles["btn-edit"]}
                      onClick={() => handleEditClick(reply)}
                    >
                      edit
                    </button>
                    <button
                      className={styles["btn-delete"]}
                      onClick={() => {
                        setSelectedReplyId(reply.id);
                        setShowReplyDeleteModal(true);
                      }}
                    >
                      delete
                    </button>
                  </div>
                )}
              </div>

              {editReplyId === reply.id ? (
                <>
                  <textarea
                    className={styles["reply-description-input"]}
                    value={editReplyContent}
                    onChange={(e) => setEditReplyContent(e.target.value)}
                  />
                  <div className={styles["reply-btn-group"]}>
                    <button
                      className={styles["submit-reply-btn"]}
                      onClick={handleSaveEdit}
                    >
                      save
                    </button>
                    <button
                      className={styles["cancel-reply-btn"]}
                      onClick={handleCancelEdit}
                    >
                      cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles["reply-description"]}>
                  {reply.content}
                </div>
              )}

              {reply.replies?.map((subReply) => (
                <div key={subReply.id} className={styles["sub-reply"]}>
                  <i
                    className={`fas fa-level-up-alt fa-rotate-90 ${styles["reply-arrow"]}`}
                  ></i>
                  <div
                    className={`${styles["reply-card"]} ${styles["nested"]}`}
                  >
                    <div className={styles["reply-header"]}>
                      <i
                        className={`fas fa-user-circle ${styles["user-icon"]}`}
                      ></i>
                      <span className={styles["user-name"]}>User Name</span>

                      {editSubReplyId !== subReply.id ||
                      editParentReplyId !== reply.id ? (
                        <div className={styles["reply-buttons"]}>
                          <button
                            className={styles["btn-edit"]}
                            onClick={() =>
                              handleEditSubReplyClick(reply.id, subReply)
                            }
                          >
                            edit
                          </button>
                          <button
                            className={styles["btn-delete"]}
                            onClick={() =>
                              handleDeleteSubReply(reply.id, subReply.id)
                            }
                          >
                            delete
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {editSubReplyId === subReply.id &&
                    editParentReplyId === reply.id ? (
                      <>
                        <textarea
                          className={styles["reply-description-input"]}
                          value={editSubReplyContent}
                          onChange={(e) =>
                            setEditSubReplyContent(e.target.value)
                          }
                        />
                        <div className={styles["reply-btn-group"]}>
                          <button
                            className={styles["submit-reply-btn"]}
                            onClick={handleSaveSubReplyEdit}
                          >
                            save
                          </button>
                          <button
                            className={styles["cancel-reply-btn"]}
                            onClick={handleCancelSubReplyEdit}
                          >
                            cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className={styles["reply-description"]}>
                        {subReply.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* 답글 쓰기 버튼 */}
              {activeReplyBox !== reply.id ? (
                <button
                  className={styles["sub-reply-btn"]}
                  onClick={() => {
                    setActiveReplyBox(reply.id);
                    setSubReplyText("");
                  }}
                >
                  Write Reply
                </button>
              ) : (
                <motion.div className={styles["reply-card"]}>
                  <div className={styles["reply-header"]}>
                    <i
                      className={`fas fa-user-circle ${styles["user-icon"]}`}
                    ></i>
                    <span className={styles["user-name"]}>User Name</span>
                  </div>
                  <textarea
                    className={styles["reply-description-input"]}
                    placeholder="답글을 입력하세요..."
                    value={subReplyText}
                    onChange={(e) => setSubReplyText(e.target.value)}
                  />
                  <div className={styles["reply-btn-group"]}>
                    <button
                      className={styles["submit-reply-btn"]}
                      onClick={() => {
                        if (!subReplyText.trim()) {
                          setShowEmptyReplyModal(true);
                          return;
                        }
                        const updatedReplies = replies.map((r) => {
                          if (r.id === reply.id) {
                            const newSubReply = {
                              id: Date.now(),
                              content: subReplyText,
                            };
                            return {
                              ...r,
                              replies: [...(r.replies || []), newSubReply],
                            };
                          }
                          return r;
                        });
                        setReplies(updatedReplies);
                        localStorage.setItem(
                          `replies-${post.id}`,
                          JSON.stringify(updatedReplies)
                        );
                        setSubReplyText("");
                        setActiveReplyBox(null);
                      }}
                    >
                      submit
                    </button>
                    <button
                      className={styles["cancel-reply-btn"]}
                      onClick={() => {
                        setActiveReplyBox(null);
                        setSubReplyText("");
                      }}
                    >
                      cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* 댓글 영역 (예시 댓글 하드코딩) */}
          <motion.div
            className={styles["reply-section"]}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[0, 1, 2].map((_, index) => (
              <motion.div
                key={index}
                className={styles["reply-card"]}
                variants={replyItemVariants}
              >
                <div className={styles["reply-header"]}>
                  <i
                    className={`fas fa-user-circle ${styles["user-icon"]}`}
                  ></i>
                  <span className={styles["user-name"]}>User Name</span>
                </div>
                <div className={styles["reply-description"]}>
                  Reply description...
                </div>

                {index === 0 && (
                  <div className={styles["sub-reply"]}>
                    <i
                      className={`fas fa-level-up-alt fa-rotate-90 ${styles["reply-arrow"]}`}
                    ></i>
                    <div
                      className={`${styles["reply-card"]} ${styles["nested"]}`}
                    >
                      <div className={styles["reply-header"]}>
                        <i
                          className={`fas fa-user-circle ${styles["user-icon"]}`}
                        ></i>
                        <span className={styles["user-name"]}>User Name</span>
                      </div>
                      <div className={styles["reply-description"]}>
                        Sub-reply description...
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

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
