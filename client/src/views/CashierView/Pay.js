import React from 'react';

const Receipt = ({ receipt, onRemove, applyTax }) => {
  const subtotal = receipt.reduce((acc, entry) => acc + (entry.price || 0), 0);
  const taxRate = 0.0825;
  const taxAmount = applyTax ? subtotal * taxRate : 0;
  const total = subtotal + taxAmount;

  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <div>
        {receipt.map((entry, index) => (
          <div key={index}>
            {entry.category ? (
              <div className="receipt-category">
                <div className="category-header">
                  <span>{entry.category} - ${entry.price.toFixed(2)}</span>
                  <img
                    src="/removeItem.svg"
                    alt="Remove item"
                    className="remove-button"
                    onClick={() => onRemove(index)}
                  />
                </div>
                {entry.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="receipt-item">
                    <span style={{ marginLeft: '20px' }}>{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="receipt-item">
                <div className="item-details">
                  <span>{entry.name} - ${entry.price.toFixed(2)}</span>
                  <img
                    src="/removeItem.svg"
                    alt="Remove item"
                    className="remove-button"
                    onClick={() => onRemove(index)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
      <h3>Tax (8.25%): ${taxAmount.toFixed(2)}</h3>
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Receipt;
