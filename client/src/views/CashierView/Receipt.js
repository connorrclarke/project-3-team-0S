import React from "react";

const Receipt = ({
  receipt,
  onRemove,
  applyTax,
  subtotal,
  discountAdjustedSubtotal,
  taxAmount,
  discount,
  total,
  showRemoveButtons = true,
}) => {
  return (
    <div className="receipt">
      <div className="receiptItemsList">
        <h2>Receipt</h2>
        {receipt.map((entry, index) => (
          <div key={index}>
            <div className="receipt-category">
              <div className="category-header">
                <span>
                  {entry.category} - ${entry.price.toFixed(2)}
                </span>
                {showRemoveButtons && (
                  <img
                    src="/removeItem.svg"
                    alt="Remove item"
                    className="remove-button"
                    onClick={() => onRemove(index)}
                  />
                )}
              </div>
              {entry.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="receipt-item" style={{ marginLeft: "20px" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
        <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        {discount > 0 && <h3>Discount: -${discount.toFixed(2)}</h3>}
        {discount > 0 && (<h3>Subtotal after Discount: ${discountAdjustedSubtotal.toFixed(2)}</h3>)}
        <h3>Tax (8.25%): ${taxAmount.toFixed(2)}</h3>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Receipt;
