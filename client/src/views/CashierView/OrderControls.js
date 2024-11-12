import React from 'react';

const OrderControls = ({ toggleTax, applyTax, onPay, onClearOrder }) => {
  return (
    <div className="order-controls">
      <button>Print Last Receipt</button>
      <button>Add Discount</button>
      <button>Split Bill</button>
      <button onClick={toggleTax}>
        {applyTax ? 'No Tax' : 'Apply Tax'}
      </button>
      <button onClick={onClearOrder}>Clear Order</button>
      <button className="checkout-button" onClick={onPay}> Pay / Close Order</button>
    </div>
  );
};

export default OrderControls;
