import React from 'react';

const OrderControls = ({
  fetchLastReceipt,
  onAddDiscount,
  hasDiscount,
  toggleTax,
  applyTax,
  onClearOrder,
  onPay,
}) => {
  return (
    <div className="order-controls">
      <div className="logo-container">
        <img src="/panda-express-logo.svg" alt="Panda Express Logo" className="logo" />
      </div>
      {/* <button onClick={fetchLastReceipt}>Print Last Receipt</button> */}
      <button onClick={onAddDiscount}>{hasDiscount ? 'Update Discount' : 'Add Discount'}</button>
      <button onClick={toggleTax}>{applyTax ? 'No Tax' : 'Apply Tax'}</button>
      <button onClick={onClearOrder}>Clear Order</button>
      <button className="checkout-button" onClick={onPay}>
        Pay / Close Order
      </button>
    </div>
  );
};

export default OrderControls;
