import React, { createContext, useContext, useState } from 'react';

// Create the context
const ReceiptContext = createContext();

// Custom hook to use the ReceiptContext
export const useReceipt = () => {
    return useContext(ReceiptContext);
};

// ReceiptProvider component to wrap the app and provide the receipt state
export const ReceiptProvider = ({ children }) => {
    const [receipt, setReceipt] = useState([]);

    // Function to add an item to the receipt
    const addItem = (newItem) => {
        setReceipt((prevReceipt) => [...prevReceipt, newItem]);
    };

    // Function to remove an item from the receipt by its index
    const removeItem = (index) => {
        setReceipt((prevReceipt) => prevReceipt.filter((_, i) => i !== index));
    };

    // Function to clear the receipt (reset it after payment)
    const clearReceipt = () => {
        setReceipt([]);
    };

    return (
        <ReceiptContext.Provider value={{ receipt, addItem, removeItem, clearReceipt }}>
            {children}
        </ReceiptContext.Provider>
    );
};

