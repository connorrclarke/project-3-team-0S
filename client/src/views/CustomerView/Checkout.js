/**
 * Checkout Component
 *
 * This component represents the checkout page where customers can review their receipt, 
 * calculate the tax, and choose a payment method to complete their transaction.
 * It provides options to cancel the checkout process or proceed with payment.
 *
 * @author Siddhi Mittal
 */
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './CustomerView.css';
import { useReceipt } from '../../contexts/ReceiptContext';
import { useZoom, ZoomProvider } from "./ZoomContext";

const Checkout = () => {
    const navigate = useNavigate(); // Hook for navigating between pages
    const location = useLocation(); // Hook to access the current location and state
    const { receipt, total } = location.state || {}; // Get receipt and total from state
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const { clearReceipt } = useReceipt(); // Using context for receipt data
    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);

    const API_URL = process.env.REACT_APP_API_URL;

    // Tax rate and tax calculation
    const taxRate = 0.0825;
    const taxAmount = total * taxRate;

    /**
     * Handles the "Cancel" button click by navigating back to the CustomerView page.
     * Resets the checkout process if canceled.
     */
    const handleCancel = () => {
        navigate('/customer');
    };

    /**
     * Handles the "Pay" button click to process the payment.
     */
    const handlePay = async () => {
        if (!selectedPaymentMethod) {
            alert("Please select a payment method before proceeding.");
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ total: (total + taxAmount).toFixed(2), method: selectedPaymentMethod }),
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Order creation failed");
            }
    
            // Update inventory for each receipt item
            for (const item of receipt) {
                await fetch(`${API_URL}/updateInventory`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ menuItemName: item.name, quantity: 1 }),
                });
            }
    
            alert(`Payment successful! Order #${data.orderNumber} confirmed.`);
            clearReceipt();
            navigate('/customer');
        } catch (error) {
            console.error("Error processing payment:", error);
            alert(error.message || "Payment failed. Please try again.");
        }
    };    

    const handleSelectPaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
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
                    <div className="receipt-customer">
                        {receipt?.map((item, index) => (
                            <div key={index} className="receipt-item-checkout">
                                <span>{item.name}</span>
                                <span>${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="receipt-summary-customer">
                        <p>Subtotal: ${total.toFixed(2)}</p>
                        <p>Tax: ${taxAmount.toFixed(2)}</p>
                        <p>Total: ${(total + taxAmount).toFixed(2)}</p>
                    </div>
                </div>

                {/* Middle column for payment methods */}
                <div className="middle-section-checkout">
                    <h2>Payment Method</h2>
                    <div className="category-buttons">
                        {["Credit Card", "Cash", "Gift Card", "Student Swipe"].map((method) => (
                            <button
                                key={method}
                                className={`category-button ${
                                    selectedPaymentMethod === method ? "selected" : ""
                                }`}
                                onClick={() => handleSelectPaymentMethod(method)}
                            >
                                {method}
                            </button>
                        ))}
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
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
                <button className="pay-button" onClick={handlePay}>Pay</button>
            </div>
        </div>
    );
};

const WrappedCheckout = () => (
    <ZoomProvider>
        <Checkout />
    </ZoomProvider>
);

export default WrappedCheckout;