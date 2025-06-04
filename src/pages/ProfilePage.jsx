import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import { motion } from "framer-motion";

function ProfilePage() {
  const navigate = useNavigate();

  // 실제 표시될 사용자 정보
  const [nickname, setNickname] = useState("user123");
  const [genre, setGenre] = useState("action");

  // 편집 중일 때 입력값 저장용
  const [tempNickname, setTempNickname] = useState(nickname);
  const [tempGenre, setTempGenre] = useState(genre);

  const [isEditing, setIsEditing] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    setTempNickname(nickname);
    setTempGenre(genre);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setTempNickname(nickname);
    setTempGenre(genre);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setNickname(tempNickname);
    setGenre(tempGenre);
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
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
          <p className={styles.label}>
            <span>User Name</span>
          </p>
        </div>

        {!isEditing && (
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit Profile
          </button>
        )}

        <div className={styles.infoSection}>
          <div className={styles.sectionTitle}>회원 정보</div>

          <motion.div className={styles.infoRow}>
            <span>
              <i className="fas fa-envelope"></i>Email
            </span>
            <div className={styles.infoValue}>user@example.com</div>
          </motion.div>

          {isEditing ? (
            <>
              <motion.div className={styles.infoRow}>
                <span>
                  <i className="fas fa-id-badge"></i>NickName
                </span>
                <input
                  type="text"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                />
              </motion.div>

              <motion.div className={styles.infoRow}>
                <span>
                  <i className="fas fa-film"></i>Genre
                </span>
                <input
                  type="text"
                  value={tempGenre}
                  onChange={(e) => setTempGenre(e.target.value)}
                />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div className={styles.infoRow}>
                <span>
                  <i className="fas fa-id-badge"></i>NickName
                </span>
                <div className={styles.infoValue}>{nickname}</div>
              </motion.div>
              <motion.div className={styles.infoRow}>
                <span>
                  <i className="fas fa-film"></i>Genre
                </span>
                <div className={styles.infoValue}>{genre}</div>
              </motion.div>
            </>
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

export default ProfilePage;
