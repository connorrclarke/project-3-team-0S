import React from "react";

/**
 * Displays the receipt with order details, subtotal, tax, and total.
 * @function Receipt
 * @param {Array<Object>} receipt - List of receipt items.
 * @param {Function} onRemove - Function to remove an item from the receipt.
 * @param {boolean} applyTax - Whether tax is applied.
 * @param {number} subtotal - The subtotal amount.
 * @param {number} discountAdjustedSubtotal - Subtotal after discount is applied.
 * @param {number} taxAmount - The tax amount.
 * @param {number} discount - The discount amount.
 * @param {number} total - The final total amount.
 * @param {boolean} showRemoveButtons - Whether to show remove buttons for receipt items.
 * @returns {JSX.Element}
 */
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
