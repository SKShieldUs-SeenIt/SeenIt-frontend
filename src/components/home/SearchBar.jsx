// SearchBar.jsx
import React from 'react';
import './SearchBar.css';

export default function SearchBar({ onClick }) {
  return (
    <div className="search-bar" onClick={onClick}>
      <input
        type="text"
        placeholder="영화를 검색해보세요"
        className="search-input"
        readOnly
      />
    </div>
  );
}
