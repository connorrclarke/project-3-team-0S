import React from 'react';

const Receipt = ({ receipt, total }) => {
  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <ul>
        {receipt.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Receipt;
