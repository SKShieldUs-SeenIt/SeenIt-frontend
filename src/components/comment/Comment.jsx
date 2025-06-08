import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateComment,
  deleteComment,
  createComment,
  fetchCommentsByPost,
} from "../../actions/commentAction";
import styles from "../../pages/PostDetailPage.module.css";
import Tippy from "@tippyjs/react";
import WarningModal from "../modal/WarningModal";
import DeleteModal from "../modal/DeleteModal";
import "tippy.js/dist/tippy.css";

const CommentSection = ({
  comments,
  postCode,
  showReplyInput,
  setShowReplyInput,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [newComment, setNewComment] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [activeReplyBox, setActiveReplyBox] = useState(null);
  const [subReplyText, setSubReplyText] = useState("");

  const handleEdit = (id, content) => {
    setEditId(id);
    setEditContent(content);
  };

  const handleSave = (id) => {
    if (!editContent.trim()) return;
    dispatch(updateComment(id, editContent)).then(() => {
      dispatch(fetchCommentsByPost(postCode));
      setShowEditSuccessModal(true);
    });
    setEditId(null);
    setEditContent("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditContent("");
  };

  const handleAskDelete = (id) => {
    setSelectedCommentId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteComment(selectedCommentId, postCode));
    setShowDeleteModal(false);
    setSelectedCommentId(null);
    setShowDeleteConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedCommentId(null);
  };

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    dispatch(createComment(postCode, newComment)).then(() => {
      dispatch(fetchCommentsByPost(postCode));
      setShowSuccessModal(true);
    });
    setNewComment("");
    setShowReplyInput(false);
  };

  const handleCancelWrite = () => {
    setNewComment("");
    setShowReplyInput(false);
  };

  const handleSubmitSubReply = (parentId) => {
    if (!subReplyText.trim()) return;
    dispatch(createComment(postCode, subReplyText, parentId)).then(() => {
      dispatch(fetchCommentsByPost(postCode));
    });
    setSubReplyText("");
    setActiveReplyBox(null);
  };

  return (
    <div className={styles["reply-section"]}>
      {showReplyInput && (
        <div className={styles["reply-header-top"]}>
          <div className={styles["reply-card"]}>
            <div className={styles["reply-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`} />
              <span className={styles["user-name"]}>{user?.name}</span>
            </div>
            <textarea
              className={styles["reply-description-input"]}
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className={styles["reply-btn-group"]}>
              <button
                className={styles["submit-reply-btn"]}
                onClick={handleSubmit}
              >
                submit
              </button>
              <button
                className={styles["cancel-reply-btn"]}
                onClick={handleCancelWrite}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {comments
        ?.filter((reply) => !reply.parentCommentId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((reply) => (
          <div key={reply.id} className={styles["reply-card"]}>
            <div className={styles["reply-header"]}>
              <i className={`fas fa-user-circle ${styles["user-icon"]}`} />
              <span className={styles["user-name"]}>{reply.user?.name}</span>

              <div className={styles["reply-buttons"]}>
                {/* 내가 쓴 댓글일 때만 수정/삭제 버튼 */}
                {reply.user?.userId === user?.userId && editId !== reply.id && (
                  <>
                  <Tippy content="답글 작성">
                      <button
                        className={styles["btn-reply"]}
                        onClick={() => setActiveReplyBox(reply.id)}
                      >
                        <i className="fas fa-pencil" style={{ marginRight: "20px" }}/>
                      </button>
                    </Tippy>
                    <span className={styles.divider}>|</span>
                    <Tippy content="수정하기">
                      <button
                        className={styles["btn-edit"]}
                        onClick={() => handleEdit(reply.id, reply.content)}
                      >
                        <i className="fas fa-pen-to-square" />
                      </button>
                    </Tippy>
                    <span className={styles.divider}>|</span>
                    <Tippy content="삭제하기">
                      <button
                        className={styles["btn-delete"]}
                        onClick={() => handleAskDelete(reply.id)}
                      >
                        <i className="fas fa-trash-alt" />
                      </button>
                    </Tippy>
                  </>
                )}

                {/* 다른 사람이 쓴 댓글일 때만 대댓글 버튼 */}
                {reply.user?.userId !== user?.userId && (
                  <div className={styles["reply-buttons"]}>
                    <Tippy content="답글 작성">
                      <button
                        className={styles["btn-reply"]}
                        onClick={() => setActiveReplyBox(reply.id)}
                      >
                        <i className="fas fa-pencil" />
                      </button>
                    </Tippy>
                  </div>
                )}
              </div>
            </div>

            {editId === reply.id ? (
              <>
                <textarea
                  className={styles["reply-description-input"]}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className={styles["reply-btn-group"]}>
                  <button
                    className={styles["submit-reply-btn"]}
                    onClick={() => handleSave(reply.id)}
                  >
                    save
                  </button>
                  <button
                    className={styles["cancel-reply-btn"]}
                    onClick={handleCancel}
                  >
                    cancel
                  </button>
                </div>
              </>
            ) : (
              <div className={styles["reply-description"]}>{reply.content}</div>
            )}

            {activeReplyBox === reply.id && (
              <div className={styles["reply-card"]}>
                <div className={styles["reply-header"]}>
                  <i className={`fas fa-user-circle ${styles["user-icon"]}`} />
                  <span className={styles["user-name"]}>{user?.name}</span>
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
                    onClick={() => handleSubmitSubReply(reply.id)}
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
              </div>
            )}

            {reply.childComments?.map((child) => (
              <div key={child.id} className={styles["sub-reply"]}>
                <i
                  className={`fas fa-level-up-alt fa-rotate-90 ${styles["reply-arrow"]}`}
                />
                <div className={`${styles["reply-card"]} ${styles["nested"]}`}>
                  <div className={styles["reply-header"]}>
                    <i
                      className={`fas fa-user-circle ${styles["user-icon"]}`}
                    />
                    <span className={styles["user-name"]}>
                      {child.user?.name}
                    </span>
                  </div>
                  <div className={styles["reply-description"]}>
                    {child.content}
                  </div>
                </div>
              </div>
            ))}

            {showSuccessModal && (
              <WarningModal
                message="댓글이 작성되었습니다."
                onClose={() => setShowSuccessModal(false)}
              />
            )}
            {showDeleteModal && (
              <DeleteModal
                message="댓글을 삭제하시겠습니까?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
            {showDeleteConfirmModal && (
              <WarningModal
                message="댓글이 삭제되었습니다."
                onClose={() => setShowDeleteConfirmModal(false)}
              />
            )}
            {showEditSuccessModal && (
              <WarningModal
                message="댓글이 수정되었습니다."
                onClose={() => setShowEditSuccessModal(false)}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentSection;
