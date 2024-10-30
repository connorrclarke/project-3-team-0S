import React from 'react';

const Receipt = ({ receipt, total }) => {
    const categorizedItems = receipt.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = { items: [], price: 0 };
        }
        acc[item.category].items.push(item.name);
        acc[item.category].price =
            item.category === 'Bowl'
                ? 8.30
                : item.category === 'Plate'
                    ? 10.50
                    : item.category === 'Bigger Plate'
                        ? 12.70
                        : item.category === 'Appetizers'
                            ? 3.50
                            : item.category === 'Drinks'
                                ? 2.00
                                : 0;
        return acc;
    }, {});

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
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <h3>Total: ${total.toFixed(2)}</h3>
        </div>
    );
};

export default Receipt;