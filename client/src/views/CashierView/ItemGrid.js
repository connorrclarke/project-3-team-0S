import React from 'react';

/**
 * Item Grid for displaying available menu items in a grid layout.
 * @function ItemGrid
 * @param {Array<string>} items - List of items to display.
 * @param {string} category - The current category of items.
 * @param {Function} addItemToReceipt - Function to add an item to the receipt.
 * @returns {JSX.Element}
 */
const ItemGrid = ({ items = [], category, addItemToReceipt }) => {
  if (!items || items.length === 0) {
    return <p>No items available in this category.</p>;
  }

  return (
    <div className={`item-grid ${category === 'Appetizers' ? 'centered-row' : 'standard-grid'}`}>
      {items.map((item) => (
        <button 
          key={item} 
          onClick={() => addItemToReceipt(item)} 
          className="item-button"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ItemGrid;
