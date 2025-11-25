import React from 'react';
import './MenuFilterBar.css';

const CATEGORIES = ["All", "Hot Beverages", "Cold Beverages", "Pastries", "Sandwiches"];

const MenuFilterBar = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  return (
    <div className="menu-filter-bar">
      <div className="search-wrapper">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="search-icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="category-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuFilterBar;