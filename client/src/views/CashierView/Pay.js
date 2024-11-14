import React from 'react';
import Receipt from './Receipt';

const Pay = ({ receipt, total = { subtotal: 0, tax: 0, final: 0 }, onClose, onConfirmPayment }) => {
  return (
    <div className="checkout-container">
      {/* Receipt Summary Section */}
      <div className="receipt-summary">
        <Receipt
          receipt={receipt}
          subtotal={total.subtotal}
          taxAmount={total.tax}
          total={total.final}
        />
      </div>

      {/* Payment Methods Section */}
      <div className="payment-methods">
        <h3>Payment Method</h3>
        <button className="payment-button">Credit Card</button>
        <button className="payment-button">Cash</button>
        <button className="payment-button">Gift Card</button>
        <button className="payment-button">Student Swipe</button>
      </div>

      {/* Bottom Buttons */}
      <button className="cancel-button" onClick={onClose}>Cancel</button>
      <button className="pay-button" onClick={onConfirmPayment}>Pay</button>
    </div>
  );
};

export default Pay;
