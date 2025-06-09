// src/pages/signup/SignupCompletePage.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateUserInfo } from '../actions/userAction';
import styles from './SignupCompletePage.module.css'; // ✅ CSS Module 적용

export default function SignupCompletePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nickname, genres } = location.state || {};

  useEffect(() => {
    if (!nickname || !genres) {
      alert('회원가입 정보가 누락되었습니다.');
      navigate('/');
      return;
    }

    const completeSignup = async () => {
      try {
        await dispatch(updateUserInfo(nickname, genres));
        console.log('✅ 회원가입 정보 업데이트 완료');
        setTimeout(() => navigate('/home'), 2000);
      } catch (err) {
        console.error('❌ 업데이트 실패:', err);
        alert('회원정보 저장 중 오류가 발생했습니다.');
        navigate('/');
      }
    };

    completeSignup();
  }, [nickname, genres, navigate, dispatch]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <i className={`fas fa-check-circle ${styles.icon}`}></i>
        <h1 className={styles.title}>회원가입 완료!</h1>
        <p className={styles.subtitle}>잠시 후 홈으로 이동합니다...</p>
        <div className={styles.spinner}></div>
      </motion.div>
    </div>
  );
}
