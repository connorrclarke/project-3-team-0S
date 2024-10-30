import React from 'react';

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
