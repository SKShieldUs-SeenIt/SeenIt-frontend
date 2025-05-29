// src/components/search/SearchPopup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SearchPopup.css';

export default function SearchPopup({ onClose }) {
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    onClose(); // 팝업 닫고
    navigate('/details/123'); // DetailPage로 이동
  };

  return (
    <div className="overlay">
      <motion.div
        className="search-popup"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="popup-header">
          <input
            type="text"
            className="search-input"
            placeholder="검색어를 입력하세요"
            autoFocus
          />
          <button className="close-btn" onClick={onClose}>
            닫기
          </button>
        </div>

        <h2 className="popup-title">검색 결과</h2>

        <button
          onClick={handleGoToDetail}
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            fontSize: '16px',
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          👉 상세 페이지로 이동
        </button>
      </motion.div>
    </div>
  );
}
