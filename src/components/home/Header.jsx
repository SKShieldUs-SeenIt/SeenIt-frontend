import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles['header-subtitle']}>서재민 님,</h2>
      <h1 className={styles['header-title']}>SeenIt?</h1>
    </header>
  );
}
