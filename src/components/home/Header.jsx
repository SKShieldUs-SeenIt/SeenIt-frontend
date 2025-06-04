import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); 

  return (
    <header className={styles.header}>
      <h2
        className={styles['header-subtitle']}
        onClick={() => navigate("/profile")}
      >
        {user ? `${user.name} 님,` : '게스트 님,'} 
      </h2>
      <h1 className={styles['header-title']}>SeenIt?</h1>
    </header>
  );
}
