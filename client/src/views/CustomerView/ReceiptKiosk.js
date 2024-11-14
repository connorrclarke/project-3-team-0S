import React from 'react';

const Receipt = ({ receipt, applyTax, subtotal, taxAmount, total, onRemove }) => {
    return (
        <div className="receipt">
            <h2>Receipt</h2>
            <ul>
                {receipt.map((item, index) => (
                    <li key={index} className="receipt-item">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                        {/* <button onClick={() => onRemove(index)} className="remove-button">
                            Remove
                        </button> */}
                        <img
                            src="/removeItem.svg"
                            alt="Remove item"
                            className="remove-button"
                            onClick={() => onRemove(index)}
                        />
                    </li>
                ))}
            </ul>
            <div className="receipt-summary">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                {applyTax && <p>Tax: ${taxAmount.toFixed(2)}</p>}
                <p>Total: ${total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Receipt;
