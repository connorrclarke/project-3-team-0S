import React from 'react';

const Receipt = ({ receipt, onRemove, applyTax }) => {
    const categorizedItems = receipt.reduce((acc, item) => {
        const category = item.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = { items: [], price: 0 };
        }
        acc[category].items.push(item.name);
        acc[category].price += item.price; // Assume item.price is provided for each item
        return acc;
    }, {});

    const subtotal = Object.values(categorizedItems).reduce((acc, category) => acc + category.price, 0);
    const taxRate = 0.0825;
    const taxAmount = applyTax ? subtotal * taxRate : 0;
    const total = subtotal + taxAmount;

    return (
        <div className="receipt">
            <h2>Receipt</h2>
            {Object.keys(categorizedItems).map((category) => (
                <div key={category}>
                    <h3>
                        {category} - ${categorizedItems[category].price.toFixed(2)}
                    </h3>
                    <ul>
                        {categorizedItems[category].items.map((item, index) => (
                            <li key={index} className="receipt-item">
                                {item}
                                <img
                                    src="/removeItem.svg"
                                    alt="Remove item"
                                    className="remove-button"
                                    onClick={() => onRemove(index)} // You may need to adjust the index based on how items are organized
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
            <h3>Tax (8.25%): ${taxAmount.toFixed(2)}</h3>
            <h3>Total: ${total.toFixed(2)}</h3>
        </div>
    );
};

export default Receipt;