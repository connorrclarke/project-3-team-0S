import React, { useState } from 'react';
import OrderControls from './OrderControls';
import Receipt from './Receipt';
import './CashierView.css';

const Pay = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [receipt, setReceipt] = useState([
    { name: 'Item 1', price: 8.99 },
    { name: 'Item 2', price: 5.49 }
  ]); // Example receipt items
  const [total, setTotal] = useState(14.48); // Example total

  const handlePay = () => {
    console.log('Pay button clicked'); // Log for debugging
    setShowPopup(true); // Show the popup message
    setReceipt([]);     // Clear receipt after payment
    setTotal(0);       // Reset total
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup when user clicks OK
  };

  return (
    <div className="pay-view">
      <h1>Order Summary</h1>
      <Receipt receipt={receipt} total={total} />
      <OrderControls onPay={handlePay} />

      {/* Popup for payment confirmation */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Your order has been placed!</p>
            <button onClick={handleClosePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
