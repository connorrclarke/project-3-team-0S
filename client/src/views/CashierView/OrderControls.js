import React from 'react';

const OrderControls = () => {
  return (
    <div className="order-controls">
      <button>Print Last Receipt</button>
      <button>Add Discount</button>
      <button>Split Bill</button>
      <button>No Tax</button>
      <button className="checkout-button">Pay / Close Order</button>
    </div>
  );
};

export default OrderControls;
