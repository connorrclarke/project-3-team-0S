import React from 'react';

const ItemGrid = ({ items, addItemToReceipt }) => {
  return (
    <div className="item-grid">
      {items.map((item) => (
        <button 
          key={item} 
          onClick={() => addItemToReceipt(item)} 
          className="entree-button"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ItemGrid;
