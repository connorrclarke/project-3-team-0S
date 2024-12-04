import React, { useState, useEffect } from 'react';
import Receipt from './Receipt';
import CategoryTabs from './CategoryTabs';
import OrderControls from './OrderControls';
import './CashierView.css';
import { useNavigate } from 'react-router-dom';

const CashierView = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [selectedCategory, setSelectedCategory] = useState('Bowl');
  const [receipt, setReceipt] = useState([]);
  const [applyTax, setApplyTax] = useState(true);
  const [showPay, setShowPay] = useState(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [discountInput, setDiscountInput] = useState('');
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [menuItems, setMenuItems] = useState({
    entrees: [],
    sides: [],
    appetizers: [],
    drinks: [],
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${API_URL}/menu-items`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const categorizedItems = {
          entrees: data.filter(item => item.Category === 'Entree' && item.available).map(item => item.Name),
          sides: data.filter(item => item.Category === 'Side' && item.available).map(item => item.Name),
          appetizers: data.filter(item => item.Category === 'Appetizer' && item.available).map(item => item.Name),
          drinks: data.filter(item => item.Category === 'Drink' && item.available).map(item => item.Name),
        };
        setMenuItems(categorizedItems);
      } catch (err) {
        console.error('Error fetching menu items:', err);
      }
    };

    fetchMenuItems();
  }, [API_URL]);

  const categories = ['Bowl', 'Plate', 'Bigger Plate', 'Appetizers', 'Drinks', 'À la carte'];
  const items = {
    Bowl: [...menuItems.sides, ...menuItems.entrees],
    Plate: [...menuItems.sides, ...menuItems.entrees],
    "Bigger Plate": [...menuItems.sides, ...menuItems.entrees],
    Appetizers: [...menuItems.appetizers],
    Drinks: [...menuItems.drinks],
    'À la carte': [...menuItems.sides, ...menuItems.entrees],
  };

  const categoryPrices = {
    Bowl: 8.30,
    Plate: 9.80,
    "Bigger Plate": 11.30,
    Appetizers: 1.75,
    Drinks: 2.5,
  };

  const categoryLimits = {
    Bowl: { sides: 1, entrees: 1 },
    Plate: { sides: 1, entrees: 2 },
    "Bigger Plate": { sides: 1, entrees: 3 },
  };

  const getPriceByItem = (item) => {
    if (menuItems.sides.includes(item)) {
      return 4.4;
    } else if (menuItems.entrees.includes(item)) {
      return 5.2;
    }
    return 0;
  };

  const addItemToReceipt = (item) => {
    if (['Bowl', 'Plate', 'Bigger Plate'].includes(selectedCategory)) {
      const limit = categoryLimits[selectedCategory];
      const existingCategoryIndex = receipt.findIndex(
        entry => entry.category === selectedCategory && 
                 (entry.items.filter(i => menuItems.sides.includes(i)).length < limit.sides || 
                  entry.items.filter(i => menuItems.entrees.includes(i)).length < limit.entrees)
      );
  
      if (existingCategoryIndex !== -1) {
        const entry = receipt[existingCategoryIndex];
        const sideCount = entry.items.filter(i => menuItems.sides.includes(i)).length;
        const entreeCount = entry.items.filter(i => menuItems.entrees.includes(i)).length;
  
        if (menuItems.sides.includes(item) && sideCount >= limit.sides) {
          setErrorMessage(`You can only add ${limit.sides} side(s) for a ${selectedCategory}.`);
          setErrorPopupVisible(true);
          return;
        }
        if (menuItems.entrees.includes(item) && entreeCount >= limit.entrees) {
          setErrorMessage(`You can only add ${limit.entrees} entree(s) for a ${selectedCategory}.`);
          setErrorPopupVisible(true);
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
          price: categoryPrices[selectedCategory],
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

    const newSubtotal = updatedReceipt.reduce((acc, entry) => acc + (entry.price || 0), 0);
    if (discount > newSubtotal) {
      setErrorMessage('The discount has been adjusted because it cannot exceed the subtotal.');
      setErrorPopupVisible(true);
      setDiscount(newSubtotal);
    }
  };

  const subtotal = receipt.reduce((acc, entry) => acc + (entry.price || 0), 0);
  const discountAdjustedSubtotal = subtotal - discount;
  const taxRate = 0.0825;
  const taxAmount = applyTax ? discountAdjustedSubtotal * taxRate : 0;
  const finalTotal = discountAdjustedSubtotal + taxAmount;

  const handleAddDiscount = () => {
    const discountValue = parseFloat(discountInput);
    if (isNaN(discountValue) || discountValue <= 0) {
      setErrorMessage('Please enter a valid discount amount.');
      setErrorPopupVisible(true);
    } else if (discountValue > subtotal) {
      setErrorMessage('Discount cannot exceed the subtotal amount.');
      setErrorPopupVisible(true);
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
      setErrorMessage('You must finish building combo before you can checkout.');
      setErrorPopupVisible(true);
      return;
    }
    setShowPay(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedPaymentMethod) {
      setErrorMessage("Please select a payment method.");
      setErrorPopupVisible(true);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5555/api/order`, {
      // const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total: finalTotal.toFixed(2), method: selectedPaymentMethod }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }
  
      setErrorMessage("Payment successful! Your order number is " + data.orderNumber);
      setErrorPopupVisible(true);
      setShowPay(false);
      setReceipt([]);
      setDiscount(0);
      setSelectedCategory("Bowl");
      setSelectedPaymentMethod(null);
    } catch (error) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
      setErrorPopupVisible(true);
    }
  };

  const goToManagerView = () => {
    navigate('/manager');
  };

  const clearOrder = () => {
    setReceipt([]);
    setDiscount(0);
    setApplyTax(true);
  };  

  return (
    <div className="cashier-layout">
      {errorPopupVisible && (
        <div className="popup error-popup">
          <div className="popup-content">
            <h3>{errorMessage}</h3>
            <button onClick={() => setErrorPopupVisible(false)}>OK</button>
          </div>
        </div>
      )}

      {showDiscountPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Enter Discount Amount ($)</h3>
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

      {showPay ? (
        <div className="checkout-container">
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

          <div className="payment-section">
            <h3>Payment Method</h3>
            {["Credit Card", "Cash", "Gift Card", "Student Swipe"].map((method) => (
              <button
                key={method}
                className={`payment-button ${
                  selectedPaymentMethod === method ? "selected" : ""
                }`}
                onClick={() => setSelectedPaymentMethod(method)}
              >
                {method}
              </button>
            ))}
            <div className="action-buttons">
              <button className="cancel-button" onClick={() => setShowPay(false)}>Cancel</button>
              <button
                className="pay-button"
                onClick={() => {
                  if (selectedPaymentMethod) {
                    handleConfirmPayment();
                  } else {
                    setErrorMessage("Please select a payment method.");
                    setErrorPopupVisible(true);
                  }
                }}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
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

          <div className="mainSection">
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              goToManagerView={goToManagerView}
              receipt={receipt}
              sides={menuItems.sides}
              entrees={menuItems.entrees}
              categoryLimits={categoryLimits}
            />

            {selectedCategory === 'Bowl' && (
              <p className="selection-message">
                Select <span className="side-text">1 Side</span> and <span className="entree-text">1 Entree</span>
              </p>
            )}
            {selectedCategory === 'Plate' && (
              <p className="selection-message">
                Select <span className="side-text">1 Side</span> and <span className="entree-text">2 Entrees</span>
              </p>
            )}
            {selectedCategory === 'Bigger Plate' && (
              <p className="selection-message">
                Select <span className="side-text">1 Side</span> and <span className="entree-text">3 Entrees</span>
              </p>
            )}
            {selectedCategory === 'Appetizers' && (
              <p className="selection-message">
                Select the Customer's <span className="appetizer-text">Appetizer</span>
              </p>
            )}
            {selectedCategory === 'Drinks' && (
              <p className="selection-message">
                Select the Customer's <span className="drink-text">Drink</span>
              </p>
            )}
            {selectedCategory === 'À la carte' && (
              <p className="selection-message">
                Each <span className="side-text">Side</span> or <span className="entree-text">Entree</span>, or both, can be added individually to the receipt
              </p>
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
                      : menuItems.sides.includes(item)
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
              onClearOrder={clearOrder}
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
