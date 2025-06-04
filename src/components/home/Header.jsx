import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <h2 className={styles['header-subtitle']}
      onClick={() => navigate("/profile")}>서재민 님,</h2>
      <h1 className={styles['header-title']}>SeenIt?</h1>
    </header>
  );
}
