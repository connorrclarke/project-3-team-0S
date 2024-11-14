import React, { useState } from 'react';
import Receipt from './Receipt';
import CategoryTabs from './CategoryTabs';
import OrderControls from './OrderControls';
import Pay from './Pay';
import './CashierView.css';
import { useNavigate } from 'react-router-dom';

const CashierView = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('Bowl');
  const [receipt, setReceipt] = useState([]);
  const [applyTax, setApplyTax] = useState(true);
  const [showPay, setShowPay] = useState(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [showComboErrorPopup, setShowComboErrorPopup] = useState(false);
  const [showLimitErrorPopup, setShowLimitErrorPopup] = useState(false);
  const [limitErrorMessage, setLimitErrorMessage] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountInput, setDiscountInput] = useState('');

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
    "Bigger Plate": 11.30,
    Appetizers: 1.75,
    Drinks: 2.5
  };

  const categoryLimits = {
    Bowl: { sides: 1, entrees: 1 },
    Plate: { sides: 1, entrees: 2 },
    "Bigger Plate": { sides: 1, entrees: 3 }
  };

  const getPriceByItem = (item) => {
    if (sides.includes(item)) {
      return 4.4;
    } else if (entrees.includes(item)) {
      return 5.2;
    }
    return 0;
  };

  const addItemToReceipt = (item) => {
    if (['Bowl', 'Plate', 'Bigger Plate'].includes(selectedCategory)) {
      const limit = categoryLimits[selectedCategory];
      const existingCategoryIndex = receipt.findIndex(
        entry => entry.category === selectedCategory && 
                 (entry.items.filter(i => sides.includes(i)).length < limit.sides || 
                  entry.items.filter(i => entrees.includes(i)).length < limit.entrees)
      );
  
      if (existingCategoryIndex !== -1) {
        const entry = receipt[existingCategoryIndex];
        const sideCount = entry.items.filter(i => sides.includes(i)).length;
        const entreeCount = entry.items.filter(i => entrees.includes(i)).length;
  
        if (sides.includes(item) && sideCount >= limit.sides) {
          setLimitErrorMessage(`You can only add ${limit.sides} side(s) for a ${selectedCategory}.`);
          setShowLimitErrorPopup(true);
          return;
        }
        if (entrees.includes(item) && entreeCount >= limit.entrees) {
          setLimitErrorMessage(`You can only add ${limit.entrees} entree(s) for a ${selectedCategory}.`);
          setShowLimitErrorPopup(true);
          return;
        }
  
        setReceipt((prevReceipt) =>
          prevReceipt.map((entry, index) =>
            index === existingCategoryIndex
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
    } else if (selectedCategory === 'Appetizers' || selectedCategory === 'Drinks') {
      const price = categoryPrices[selectedCategory];
      const newItem = { name: item, price };
      setReceipt((prevReceipt) => [...prevReceipt, newItem]);
    } else {
      const price = getPriceByItem(item);
      const newItem = { name: item, price };
      setReceipt((prevReceipt) => [...prevReceipt, newItem]);
    }
  };

  const removeItemFromReceipt = (index) => {
    const updatedReceipt = receipt.filter((_, i) => i !== index);
    setReceipt(updatedReceipt);
  };

  const subtotal = receipt.reduce((acc, entry) => acc + (entry.price || 0), 0);
  const discountAdjustedSubtotal = subtotal - discount;
  const taxRate = 0.0825;
  const taxAmount = applyTax ? discountAdjustedSubtotal * taxRate : 0;
  const finalTotal = discountAdjustedSubtotal + taxAmount;

  const handleAddDiscount = () => {
    const discountValue = parseFloat(discountInput);
    if (isNaN(discountValue) || discountValue <= 0) {
      alert('Please enter a valid discount amount.');
    } else if (discountValue > subtotal) {
      alert('Discount cannot exceed the subtotal amount.');
    } else {
      setDiscount(discountValue);
      setShowDiscountPopup(false);
      setDiscountInput('');
    }
  };

  const isComboComplete = () => {
    return receipt.every((item) => {
      if (item.category === 'Bowl') {
        return item.items.length === 2;
      } else if (item.category === 'Plate') {
        return item.items.length === 3;
      } else if (item.category === 'Bigger Plate') {
        return item.items.length === 4;
      }
      return true;
    });
  };

  const handlePay = () => {
    if (!isComboComplete()) {
      setShowComboErrorPopup(true);
      return;
    }
    setShowPay(true);
  };

  const handleCloseComboErrorPopup = () => setShowComboErrorPopup(false);

  const handleConfirmPayment = () => {
    setShowPay(false);
    setReceipt([]);
    setDiscount(0);
    setSelectedCategory('Bowl');
  };

  const goToManagerView = () => {
    navigate('/manager');
  };

  return (
    <div className="cashier-layout">
      {showDiscountPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter Discount Amount</h3>
            <input
              type="number"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              placeholder="Discount in dollars"
            />
            <button onClick={handleAddDiscount}>Apply Discount</button>
            <button onClick={() => setShowDiscountPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showComboErrorPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>You must finish building combo before you can checkout</h3>
            <button onClick={handleCloseComboErrorPopup}>OK</button>
          </div>
        </div>
      )}

      {showLimitErrorPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{limitErrorMessage}</h3>
            <button onClick={() => setShowLimitErrorPopup(false)}>OK</button>
          </div>
        </div>
      )}

      {showPay ? (
        <Pay
          receipt={receipt}
          total={{ subtotal: subtotal || 0, tax: taxAmount || 0, final: finalTotal || 0 }}
          tax={taxAmount || 0}
          onClose={() => setShowPay(false)}
          onConfirmPayment={handleConfirmPayment}
        />
      ) : (
        <>
          <div className="receipt-section">
            <Receipt
              receipt={receipt}
              onRemove={removeItemFromReceipt}
              applyTax={applyTax}
              subtotal={subtotal}
              discountAdjustedSubtotal={discountAdjustedSubtotal}
              taxAmount={taxAmount}
              discount={discount}
              total={finalTotal}
            />
          </div>

          <div className="main-section">
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              goToManagerView={goToManagerView}
              receipt={receipt}
              sides={sides}
              entrees={entrees}
              categoryLimits={categoryLimits}
            />

            {selectedCategory === 'Bowl' && (
              <p className="selection-message">Select 1 Side and 1 Entree</p>
              // <p className="selection-message">Select 1-2 Side(s) and 1 Entree</p>
            )}
            {selectedCategory === 'Plate' && (
              <p className="selection-message">Select 1 Side and 2 Entrees</p>
              // <p className="selection-message">Select 1-2 Side(s) and 2 Entrees</p>
            )}
            {selectedCategory === 'Bigger Plate' && (
              <p className="selection-message">Select 1 Side and 3 Entrees</p>
              // <p className="selection-message">Select 1-2 Side(s) and 3 Entrees</p>
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
              toggleTax={() => setApplyTax(!applyTax)}
              applyTax={applyTax}
              onClearOrder={() => {
                setReceipt([]);
                setDiscount(0);
              }}
              onAddDiscount={() => setShowDiscountPopup(true)}
              hasDiscount={discount > 0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CashierView;
