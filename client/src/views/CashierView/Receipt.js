import React from 'react';

const Receipt = ({ receipt, onRemove, applyTax }) => {
  const subtotal = receipt.reduce((acc, item) => acc + item.price, 0);
  const taxRate = 0.0825;
  const taxAmount = applyTax ? subtotal * taxRate : 0;
  const total = subtotal + taxAmount;

  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <ul>
        {receipt.map((item, index) => (
          <li key={index} className="receipt-item">
            {item.name} - ${item.price.toFixed(2)}
            <img
              src="/removeItem.svg"
              alt="Remove item"
              className="remove-button"
              onClick={() => onRemove(index)}
            />
          </li>
        ))}
      </ul>
      <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      <h3>Tax (8.25%): ${taxAmount.toFixed(2)}</h3>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Receipt;
