import React, { useState } from 'react';

const CategoryTabs = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  goToManagerView,
  receipt,
  sides,
  entrees,
  categoryLimits,
}) => {
  const [showIncompleteComboPopup, setShowIncompleteComboPopup] = useState(false);
  const [incompleteComboMessage, setIncompleteComboMessage] = useState('');

  const handleCategoryChange = (newCategory) => {
    if (['Bowl', 'Plate', 'Bigger Plate'].includes(selectedCategory)) {
      const limit = categoryLimits[selectedCategory];
      const incompleteCombo = receipt.some(entry => {
        if (entry.category === selectedCategory) {
          const sideCount = entry.items.filter(i => sides.includes(i)).length;
          const entreeCount = entry.items.filter(i => entrees.includes(i)).length;
          return sideCount < limit.sides || entreeCount < limit.entrees;
        }
        return false;
      });

      if (incompleteCombo) {
        setIncompleteComboMessage(`Please complete each ${selectedCategory} combo with ${limit.sides} side(s) and ${limit.entrees} entree(s) before switching.`);
        setShowIncompleteComboPopup(true);
        return;
      }
    }
    setSelectedCategory(newCategory);
  };

  return (
    <div>
      <div className="category-tabs">
        {categories.map((category) => (
          <button 
            key={category} 
            onClick={() => handleCategoryChange(category)}
            className={category === selectedCategory ? 'active' : ''}
          >
            {category}
          </button>
        ))}
        <button className="manager-button" onClick={goToManagerView}>Manager</button>
      </div>
      {showIncompleteComboPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{incompleteComboMessage}</h3>
            <button onClick={() => setShowIncompleteComboPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;
