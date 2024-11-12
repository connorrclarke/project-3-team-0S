import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import Receipt from './ReceiptKiosk';

const CustomerView = () => {
    const navigate = useNavigate();

    const goToEmployeeLogin = () => {
        navigate('/employee');
    };

    const goToBowlPage = () => {
        // Add bowl item to receipt
        const newItem = { name: 'Bowl', price: 5.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToPlatePage = () => {
        // Add plate item to receipt
        const newItem = { name: 'Plate', price: 7.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToBiggerPlatePage = () => {
        // Add bigger plate item to receipt
        const newItem = { name: 'Bigger Plate', price: 9.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToAppetizersPage = () => {
        // Add appetizer item to receipt
        const newItem = { name: 'Appetizer', price: 3.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToDrinksPage = () => {
        // Add drink item to receipt
        const newItem = { name: 'Drink', price: 2.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToCheckout = () => {
        navigate('/checkout', { state: { receipt, total } });
    };

    const [receipt, setReceipt] = useState([]);

    const subtotal = receipt.reduce((acc, item) => acc + item.price, 0);
    const taxRate = 0.0825;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    return (
        <div className="customer-layout">
            {/* Top bar with weather info and employee login button */}
            <div className="top-bar">
                <div className="weather-info">Sunny, 75°F</div>
                <button className="employee-login-button" onClick={goToEmployeeLogin}>
                    Employee Login
                </button>
            </div>

            {/* Left section with receipt and checkout */}
            <div className="left-section">
                <Receipt receipt={receipt} />
                <button className="checkout-button" onClick={goToCheckout}>Checkout</button>
            </div>

            {/* Middle section with 5 item selection circles */}
            <div className="middle-section">
                <button onClick={goToBowlPage} className="category-circle"> Bowl </button>
                <button onClick={goToPlatePage} className="category-circle"> Plate </button>
                <button onClick={goToBiggerPlatePage} className="category-circle"> Bigger Plate </button>
                <button onClick={goToAppetizersPage} className="category-circle"> Appetizers </button>
                <button onClick={goToDrinksPage} className="category-circle"> Drinks </button>
            </div>

            {/* Bottom bar with action buttons */}
            <div className="bottom-bar">
                <button>High Contrast</button>
                <button>Google Translate</button>
                <button>Zoom In</button>
                <button>Zoom Out</button>
            </div>
        </div>
    );
};

export default CustomerView;