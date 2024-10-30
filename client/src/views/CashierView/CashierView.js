import React, { useState } from 'react';
import Receipt from './Receipt';
import CategoryTabs from './CategoryTabs';
import OrderControls from './OrderControls';
import './CashierView.css';
import Pay from './Pay';

const CashierView = () => {
  const [selectedCategory, setSelectedCategory] = useState('Bowl');
  const [receipt, setReceipt] = useState([]);
  const [applyTax, setApplyTax] = useState(true);

  const categories = ['Bowl', 'Plate', 'Bigger Plate', 'Appetizers', 'Drinks', 'À la carte'];
  const entrees = [
    "Bourbon Chicken", "Orange Chicken", "Honey Walnut Shrimp", "Teriyaki Chicken",
    "Broccoli Beef", "Kung Pao Chicken", "Honey Sesame Chicken", "Beijing Beef",
    "Sweet Fire Chicken", "Mushroom Chicken", "String Bean Chicken", "Black Pepper Steak"
  ];
  const sides = ['Chow Mein', 'Fried Rice', 'White Rice', 'Super Greens'];

  const items = {
    Bowl: [...sides, ...entrees],
    Plate: [...sides, ...entrees],
    "Bigger Plate": [...sides, ...entrees],
    Appetizers: ['Egg Roll', 'Spring Roll', 'Cream Cheese Rangoon', 'Apple Pie Roll'],
    Drinks: ['Fountain Drink', 'Mexican Coke', 'Apple Juice', 'Water Bottle'],
    'À la carte': [...sides, ...entrees]
  };

  const addItemToReceipt = (item) => {
    const price = 8.30; // Example price
    const newItem = { name: item, price };
    setReceipt((prevReceipt) => [...prevReceipt, newItem]);
  };

  const removeItemFromReceipt = (index) => {
    const updatedReceipt = receipt.filter((_, i) => i !== index);
    setReceipt(updatedReceipt);
  };

  const toggleTax = () => {
    setApplyTax(!applyTax); // Toggle the applyTax state
  };

  const handlePay = () => {
    // Logic to handle payment confirmation
    alert('Your order has been placed!'); // Simple alert as a placeholder
    setReceipt([]); // Clear receipt
    setTotal(0); // Reset total
  };

  return (
    <div className="cashier-layout">
      <div className="receipt-section">
        <Receipt receipt={receipt} onRemove={removeItemFromReceipt} applyTax={applyTax} />
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
        {selectedCategory === 'À la carte' && (
          <p className="selection-message">Each Item Will be Added Individually to the Receipt</p>
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

        <OrderControls onPay={handlePay} />
        <OrderControls toggleTax={toggleTax} applyTax={applyTax} />
      </div>
    </div>
  );
};

export default CashierView;
