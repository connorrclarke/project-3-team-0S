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

    const { zoomLevel, updateZoomLevel } = useZoom(); // Access zoom level and update functions from context
    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2)); // Handles zoom in functionality with a maximum zoom level of 2
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));// Handles zoom out functionality with a minimum zoom level of 0.5
    const handleResetZoom = () => updateZoomLevel(1); // Resets zoom to the default level (1)

    const API_URL = process.env.REACT_APP_API_URL; // Base API URL from enviroment variables

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
            clearReceipt(); // Clear the receipt after a successful payment
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
                <div className="checkout-left-section">
                    <h2>Receipt</h2>
                    <div className="checkout-receipt-customer">
                        {receipt?.map((item, index) => (
                            <div key={index} className="checkout-receipt-item-checkout">
                                <span className="checkout-item-name">{item.name}</span>
                                <span className="checkout-item-price">${item.price.toFixed(2)}</span>

                                {/* Display sides if available */}
                                {item.sides && <div className="checkout-item-details">Sides: {item.sides}</div>}
                                
                                {/* Display entrees if available */}
                                {item.entrees && <div className="checkout-item-details">Entrees: {item.entrees}</div>}
                            </div>
                        ))}
                    </div>
                    <div className="checkout-receipt-summary-customer">
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

// Wraps the Checkout component with the ZoomProvider for zoom context
const WrappedCheckout = () => (
    <ZoomProvider>
        <Checkout />
    </ZoomProvider>
);

export default WrappedCheckout;