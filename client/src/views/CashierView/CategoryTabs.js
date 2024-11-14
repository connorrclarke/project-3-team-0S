import React from 'react';

const CategoryTabs = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  goToManagerView,
  receipt,
  sides,
  entrees,
  categoryLimits
}) => {
  const handleCategoryChange = (newCategory) => {
    // Only check if switching from Bowl, Plate, or Bigger Plate
    if (['Bowl', 'Plate', 'Bigger Plate'].includes(selectedCategory)) {
      const limit = categoryLimits[selectedCategory];

      // Check all instances of the selected category in the receipt
      const incompleteCombo = receipt.some(entry => {
        if (entry.category === selectedCategory) {
          const sideCount = entry.items.filter(i => sides.includes(i)).length;
          const entreeCount = entry.items.filter(i => entrees.includes(i)).length;
          return sideCount < limit.sides || entreeCount < limit.entrees;
        }
        return false;
      });

      if (incompleteCombo) {
        alert(`Please complete each ${selectedCategory} combo with ${limit.sides} side(s) and ${limit.entrees} entree(s) before switching.`);
        return;
      }
    }

    // If checks pass, allow category change
    setSelectedCategory(newCategory);
  };

  return (
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
  );
};

export default CategoryTabs;
