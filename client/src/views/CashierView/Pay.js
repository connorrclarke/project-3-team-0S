import React, { useState } from 'react';
import Receipt from './Receipt';
import './CashierView.css';

const Pay = ({ receipt, total, applyTax, onClose, onConfirmPayment }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePay = () => {
    console.log('Pay button clicked');
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    onConfirmPayment();
  };

  return (
    <div className="pay-view">
      <h1>Order Summary</h1>
      <Receipt receipt={receipt} applyTax={applyTax} />

      <div className="order-controls">
        <button
          className="back-button"
          onClick={onClose}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          Back
        </button>

        <button className="checkout-button" onClick={handlePay}>
          Pay / Close Order
        </button>
      </div>

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
