import React from 'react';

const OrderControls = ({ toggleTax, applyTax }) => {
  return (
    <div className="order-controls">
      <button>Print Last Receipt</button>
      <button>Add Discount</button>
      <button>Split Bill</button>
      <button onClick={toggleTax}>
        {applyTax ? 'No Tax' : 'Apply Tax'}
      </button>
      <button className="checkout-button">Pay / Close Order</button>
    </div>
  );
};

export default OrderControls;
