import React from 'react';

const CategoryTabs = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-tabs">
      {categories.map((category) => (
        <button 
          key={category} 
          onClick={() => setSelectedCategory(category)}
          className={category === selectedCategory ? 'active' : ''}
        >
          {category}
        </button>
      ))}
      <button className="manager-button">Manager</button>
    </div>
  );
};

export default CategoryTabs;
