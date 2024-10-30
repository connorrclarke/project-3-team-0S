import React, { useState } from 'react';
import Receipt from './Receipt';
import CategoryTabs from './CategoryTabs';
import OrderControls from './OrderControls';
import './CashierView.css';

const CashierView = () => {
  const [selectedCategory, setSelectedCategory] = useState('Bowl');
  const [receipt, setReceipt] = useState([]);
  const [total, setTotal] = useState(0);

  const categories = ['Bowl', 'Plate', 'Bigger Plate', 'Appetizers', 'Drinks'];

  const entrees = [
    "Bourbon Chicken", "Orange Chicken", "Honey Walnut Shrimp",
    "Teriyaki Chicken", "Broccoli Beef", "Kung Pao Chicken",
    "Honey Sesame Chicken", "Beijing Beef", "Sweet Fire Chicken",
    "Mushroom Chicken", "String Bean Chicken", "Black Pepper Steak"
  ];

  const sides = ['Chow Mein', 'Fried Rice', 'White Rice', 'Super Greens'];

  const items = {
    Bowl: [...sides, ...entrees],
    Plate: [...sides, ...entrees],
    "Bigger Plate": [...sides, ...entrees],
    Appetizers: ['Egg Roll', 'Spring Roll', 'Cream Cheese Rangoon', 'Apple Pie Roll'],
    Drinks: ['Fountain Drink', 'Mexican Coke', 'Apple Juice', 'Water Bottle']
  };

  const addItemToReceipt = (item) => {
    const price = 8.30; // Example price
    const newItem = { name: item, price };
    setReceipt([...receipt, newItem]);
    setTotal(total + price);
  };

  return (
    <div className="cashier-layout">
      <div className="receipt-section">
        <Receipt receipt={receipt} total={total} />
      </div>

      <div className="main-section">
        <CategoryTabs 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        {selectedCategory === 'Bowl' && (
          <p className="selection-message">Select 1-2 Side(s) and 1 Entree</p>
        )}
        {selectedCategory === 'Plate' && (
          <p className="selection-message">Select 1-2 Side(s) and 2 Entrees</p>
        )}
        {selectedCategory === 'Bigger Plate' && (
          <p className="selection-message">Select 1-2 Side(s) and 3 Entrees</p>
        )}
        {selectedCategory === 'Appetizers' && (
          <p className="selection-message">Select the Customer's Appetizer</p>
        )}
        {selectedCategory === 'Drinks' && (
          <p className="selection-message">Select the Customer's Drink</p>
        )}

        <div className="item-grid">
          {items[selectedCategory].map((item) => (
            <button
              key={item}
              onClick={() => addItemToReceipt(item)}
              className={`item-button ${
                selectedCategory === 'Appetizers'
                  ? 'appetizer-button'
                  : selectedCategory === 'Drinks'
                  ? 'drink-button'
                  : sides.includes(item)
                  ? 'side-button'
                  : 'entree-button'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <OrderControls />
      </div>
    </div>
  );
};

export default CashierView;
