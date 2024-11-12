import React, { useState } from 'react';
import Receipt from './Receipt';
import CategoryTabs from './CategoryTabs';
import OrderControls from './OrderControls';
import Pay from './Pay';
import './CashierView.css';
import { useNavigate } from 'react-router-dom';

const CashierView = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('Bowl'); //Default to bowl
  const [receipt, setReceipt] = useState([]);
  const [applyTax, setApplyTax] = useState(true);
  const [showPay, setShowPay] = useState(false);

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

  const categoryPrices = {
    Bowl: 8.30,
    Plate: 9.80,
    "Bigger Plate": 11.30
  };

  // Function to get the default price of an item type, used primarily for 'À la carte' items
  const getPriceByItem = (item) => {
    if (sides.includes(item)) {
      return 4.4; // Side price
    } else if (entrees.includes(item)) {
      return 5.2; // Entree price
    }
    return 0; // Fallback price if not recognized
  };

  const addItemToReceipt = (item) => {
    if (['Bowl', 'Plate', 'Bigger Plate'].includes(selectedCategory)) {
      const existingCategory = receipt.find(entry => entry.category === selectedCategory);

      if (existingCategory) {
        setReceipt((prevReceipt) =>
          prevReceipt.map(entry =>
            entry.category === selectedCategory
              ? { ...entry, items: [...entry.items, item] }
              : entry
          )
        );
      } else {
        const newEntry = {
          category: selectedCategory,
          items: [item],
          price: categoryPrices[selectedCategory]
        };
        setReceipt((prevReceipt) => [...prevReceipt, newEntry]);
      }
    } else if (selectedCategory === 'À la carte') {
      // For À la carte, get the specific price of the item as either a side or entree
      const price = getPriceByItem(item);
      const newItem = { name: item, price };
      setReceipt((prevReceipt) => [...prevReceipt, newItem]);
    } else {
      // For Appetizers and Drinks, add items directly with fixed prices
      const price = selectedCategory === 'Appetizers'
        ? 1.75
        : selectedCategory === 'Drinks'
        ? 2.5
        : 0; // Fallback in case of an unexpected category

      const newItem = { name: item, price };
      setReceipt((prevReceipt) => [...prevReceipt, newItem]);
    }
  };

  const removeItemFromReceipt = (index) => {
    const updatedReceipt = receipt.filter((_, i) => i !== index);
    setReceipt(updatedReceipt);
  };

  const toggleTax = () => {
    setApplyTax(!applyTax);
  };

  const subtotal = receipt.reduce((acc, entry) => acc + (entry.price || 0), 0);
  const taxRate = 0.0825;
  const taxAmount = applyTax ? subtotal * taxRate : 0;
  const total = subtotal + taxAmount;

  const clearOrder = () => {
    setReceipt([]);
  }

  const handlePay = () => {
    setShowPay(true);
  };

  const handleBack = () => {
    setShowPay(false);
  };

  const handleConfirmPayment = () => {
    setShowPay(false);
    setReceipt([]);
    setSelectedCategory('Bowl');
  };

  const goToManagerView = () => {
    navigate('/manager');
  };

  return (
    <div className="cashier-layout">
      {showPay ? (
        <Pay
          receipt={receipt}
          total={total}
          applyTax={applyTax}
          onClose={handleBack}
          onConfirmPayment={handleConfirmPayment}
        />
      ) : (
        <>
          <div className="receipt-section">
            <Receipt receipt={receipt} onRemove={removeItemFromReceipt} applyTax={applyTax} />
          </div>

          <div className="main-section">
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              goToManagerView={goToManagerView}
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

            <OrderControls
              onPay={handlePay}
              toggleTax={toggleTax}
              applyTax={applyTax}
              onClearOrder={clearOrder}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CashierView;
