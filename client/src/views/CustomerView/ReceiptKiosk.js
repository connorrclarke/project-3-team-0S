/**
 * Receipt Component
 *
 * This component is responsible for rendering the receipt that includes a list of purchased items, 
 * their prices, and the subtotal, tax (if applicable), and total.
 * It also provides the functionality to remove items from the receipt.
 *
 * @author Siddhi Mittal
 * @param {Array} receipt - Array of items in the receipt with name and price.
 * @param {boolean} applyTax - Flag to determine if tax should be applied.
 * @param {number} subtotal - The subtotal of the items before tax.
 * @param {number} taxAmount - The calculated tax amount.
 * @param {number} total - The total after tax.
 * @param {function} onRemove - Function to remove an item from the receipt.
 * 
 * @returns JSX to display the receipt, subtotal, tax, and total.
 */
import React from 'react';

const Receipt = ({ receipt, applyTax, subtotal, taxAmount, total, onRemove }) => {
    return (
        <div className="receipt-customer">
            <h2>Receipt</h2>
            <ul>
                {receipt.map((item, index) => (
                    <li key={index} className="receipt-item-checkout">
                        <div className="item-row">
                            <span className="item-name">{item.name}</span>
                            <span className="item-actions">
                                <span className="item-price">${item.price.toFixed(2)}</span>
                                <img
                                    src="/removeItem.svg"
                                    alt="Remove item"
                                    className="remove-button"
                                    onClick={() => onRemove(index)}
                                />
                            </span>
                        </div>
                        {item.sides && <div className="item-details">{item.sides}</div>}
                        {item.entrees && <div className="item-details">{item.entrees}</div>}
                    </li>
                ))}
            </ul>
            <div className="receipt-summary-customer">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                {applyTax && <p>Tax: ${taxAmount.toFixed(2)}</p>}
                <p>Total: ${total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Receipt;
