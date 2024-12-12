import React, { useState } from 'react';

/**
 * Category Tabs for navigating different order categories.
 * @function CategoryTabs
 * @param {Array<string>} categories - The list of categories.
 * @param {string} selectedCategory - The currently selected category.
 * @param {Function} setSelectedCategory - Function to update the selected category.
 * @param {Function} goToManagerView - Function to navigate to the manager view.
 * @param {Array<Object>} receipt - The current receipt data.
 * @param {Array<string>} sides - List of available side items.
 * @param {Array<string>} entrees - List of available entree items.
 * @param {Object} categoryLimits - Limits for sides and entrees per category.
 * @returns {JSX.Element}
 */
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

  /**
   * Changes the selected category and validates combo completion.
   * @function handleCategoryChange
   * @param {string} newCategory - The new category to select.
   * @returns {void}
   */
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
