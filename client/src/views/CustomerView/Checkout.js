import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import '../../App.css';
import './CustomerView.css';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { receipt, total } = location.state || {}; // Get receipt and total from state

    const taxRate = 0.0825;
    const taxAmount = total * taxRate;

    // Handle cancel action (navigate back to the home page or reset the state)
    const handleCancel = () => {
        navigate('/customer');
    };

    // Handle the payment logic (this could be an API call to process payment)
    const handlePay = () => {
        // Here you would typically process the payment, then clear the receipt or do other logic
        // navigate('/');
    };

    return (
        <div className="checkout-layout">
            {/* Title bar */}
            <div className="top-bar">
                <h1>Checkout</h1>
            </div>

            <div className="checkout-content">
                {/* Left column for receipt */}
                <div className="left-section-checkout">
                    <h2>Receipt</h2>
                    <div className="receipt">
                        {receipt?.map((item, index) => (
                            <div key={index} className="receipt-item">
                                <span>{item.name}</span>
                                <span>${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="receipt-summary">
                        <p>Subtotal: ${total.toFixed(2)}</p>
                        <p>Tax: ${taxAmount.toFixed(2)}</p>
                        <p>Total: ${(total + taxAmount).toFixed(2)}</p>
                    </div>
                </div>

                {/* Middle column for payment methods */}
                <div className="middle-section-checkout">
                    <h2>Payment Method</h2>
                    <div className="category-buttons">
                        <button className="category-button">Credit Card</button>
                        <button className="category-button">Cash</button>
                        <button className="category-button">Gift Card</button>
                        <button className="category-button">Student Swipe</button>
                    </div>
                </div>

                {/* Right column for additional options if needed */}
                {/* <div className="right-section">
                    {/* <div className="bottom-middle-buttons">
                        <button>High Contrast</button>
                        <button>Google Translate</button>
                        <button>Zoom In</button>
                        <button>Zoom Out</button>
                    </div> 
                </div> */}
            </div>

            

            {/* Bottom buttons for cancel/pay */}
            <div className="bottom-bar">
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                <button className="pay-button" onClick={handlePay}>Pay</button>
            </div>
        </div>
    );
};

export default Checkout;