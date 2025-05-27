import React from 'react';
import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="영화를 검색해보세요" className="search-input" />
      <button className="search-button">🔍</button>
    </div>
  );
}