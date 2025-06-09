import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo, deleteUserAccount } from "../actions/userAction";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [nickname, setNickname] = useState("");
  const [genre, setGenre] = useState([]);
  const [tempNickname, setTempNickname] = useState("");
  const [tempGenre, setTempGenre] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const availableGenres = [
    "액션", "로맨스", "코미디", "스릴러", "SF", "애니메이션", "다큐멘터리", "드라마"
  ];

  useEffect(() => {
    if (user) {
      setNickname(user.name || "");
      setGenre(user.preferredGenres || []);
    }
  }, [user]);

  const handleBack = () => navigate(-1);

  const handleEditClick = () => {
    setTempNickname(nickname);
    setTempGenre([...genre]);
    setIsEditing(true);
  };

  const handleCancelClick = () => setIsEditing(false);

  const toggleGenre = (g) => {
    setTempGenre((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    );
  };

  const handleSaveClick = async () => {
    try {
      await dispatch(updateUserInfo(tempNickname, tempGenre));
      setNickname(tempNickname);
      setGenre(tempGenre);
      setIsEditing(false);
    } catch (err) {
      alert("정보 저장에 실패했습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      try {
        await dispatch(deleteUserAccount());
        navigate("/");
      } catch (err) {
        alert("계정 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>← Back</button>
      </div>

      <div className={styles.titleWrapper}>
        <div className={styles.titleLine}></div>
        <motion.h1
          className={styles.title}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          User Profile
        </motion.h1>
      </div>

      <motion.div
        className={styles.profileCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.iconSection}>
          <i className={`fas fa-user-circle ${styles.userIcon}`}></i>
        </div>

        <div className={styles.usernameSection}>
          <p className={styles.label}><span>User Name</span></p>
        </div>

        {!isEditing && (
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit Profile
          </button>
        )}

        <div className={styles.infoSection}>
          <div className={styles.sectionTitle}>회원 정보</div>

          {isEditing ? (
            <>
              <motion.div className={styles.infoRow}>
                <span><i className="fas fa-id-badge"></i>NickName</span>
                <input
                  type="text"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                />
              </motion.div>

              <motion.div className={styles.infoRow}>
                <span><i className="fas fa-film"></i>Genre</span>
                <div className={styles.genreButtonGroup}>
                  {availableGenres.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGenre(g)}
                      className={`${styles.genreButton} ${
                        tempGenre.includes(g) ? styles.selected : ""
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div className={styles.infoRow}>
                <span><i className="fas fa-id-badge"></i>NickName</span>
                <div className={styles.infoValue}>{nickname}</div>
              </motion.div>

              <motion.div className={styles.infoRow}>
                <span><i className="fas fa-film"></i>Genre</span>
                <div className={styles.infoValue}>
                  {Array.isArray(genre) ? genre.join(", ") : genre}
                </div>
              </motion.div>
            </>
          )}

          {/* ✅ 삭제 버튼 위치 변경: 정보 카드 내부 우측 하단 */}
          {!isEditing && (
            <div className={styles.deleteButtonWrapper}>
              <button className={styles.deleteButton} onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          )}
        </div>

        {isEditing && (
          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              className={`${styles.editButton} ${styles.cancelButton}`}
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSaveClick}>
              Save
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
