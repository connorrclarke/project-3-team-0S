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
import {useZoom, ZoomProvider} from "./ZoomContext";

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

    // Tax rate and tax calculation
    const taxRate = 0.0825;
    const taxAmount = total * taxRate;

    /**
     * Handles the "Cancel" button click by navigating back to the CustomerView page.
     * Resets the checkout process if canceled.
     */
    const handleCancel = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    /**

     * Handles the "Add" button click by navigating back to the CustomerView page.
     * (Future functionality could include saving the current selection before navigating.)
     */
    const handleAdd = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    // Navigates to sides page
    const goToSide = () => {
        navigate('/sides');
    };

    // Navigates to entree page
    const goToEntree = () => {
        navigate('/entree');

     * Handles the "Pay" button click to process the payment.
     * (Future functionality could include integrating with a payment API.)
     */
    const handlePay = () => {
        if (!selectedPaymentMethod) {
            alert("Please select a payment method before proceeding.");
            return;
        }
        alert(`Payment method selected: ${selectedPaymentMethod}. Your payment has been processed`);
        // More payment logic here

        // Going back to customer page
        clearReceipt();
        navigate('/customer')
    };

    const handleSelectPaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h1>Bigger Plate</h1>
            </div>

            <div className="middle-section">
                <div className="category-description">
                    <p>Select your side:</p>
                    <div onClick={goToSide} className="sides-circle">
                        <span>Sides</span>
                    </div>
                </div>

                <div className="category-description">
                    <p>Select your 1st entree:</p>
                    <div onClick={goToEntree} className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>

                <div className="category-description">
                    <p>Select your 2nd entree:</p>
                    <div onClick={goToEntree} className="entree-circle">

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

                <div classNae="category-description">
                    <p>Select your 3rd entree:</p>
                    <div onClick={goToEntree} className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>
            </div>

            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleAdd} className="add-button">Add</button>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
            </div>
        </div>
    );
}

const WrappedBiggerPlate = () => (
    <ZoomProvider>
        <Biggerplate />
    </ZoomProvider>
);

export default WrappedBiggerPlate;;