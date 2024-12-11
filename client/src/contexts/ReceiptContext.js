/**
 * ReceiptContext Component
 *
 * This component manages the receipt state, which holds the list of items added to the receipt.
 * It provides functionality to add, remove, and clear items from the receipt through context.
 * This context can be consumed by components throughout the app to manage the receipt.
 *
 * @author Siddhi Mittal
 */

import React, { createContext, useContext, useState } from 'react';

// Create the context to manage the receipt state globally
const ReceiptContext = createContext();

/**
 * useReceipt Hook
 *
 * This custom hook allows components to easily access the ReceiptContext. It provides
 * access to the current receipt, along with functions to add, remove, or clear items.
 *
 * @returns {Object} The context value containing the receipt state and functions to modify it.
 */
export const useReceipt = () => {
    return useContext(ReceiptContext);
};

/**
 * ReceiptProvider Component
 *
 * This provider component wraps the application or specific parts of the app that need
 * access to the receipt state. It holds the current receipt in state and provides functions
 * to manipulate it: add items, remove items, and clear the receipt.
 *
 * @param {ReactNode} children - The child components that will consume the receipt context.
 */
export const ReceiptProvider = ({ children }) => {
    // State to store the list of items in the receipt
    const [receipt, setReceipt] = useState([]);

    /**
     * addItem Function
     *
     * Adds a new item to the receipt by updating the state with the new item.
     *
     * @param {Object} newItem - The new item to add to the receipt.
     */
    const addItem = (newItem) => {
        setReceipt((prevReceipt) => [...prevReceipt, newItem]);
    };

    /**
     * removeItem Function
     *
     * Removes an item from the receipt by its index in the array.
     *
     * @param {number} index - The index of the item to remove from the receipt.
     */
    const removeItem = (index) => {
        setReceipt((prevReceipt) => prevReceipt.filter((_, i) => i !== index));
    };

    /**
     * clearReceipt Function
     *
     * Clears the receipt, resetting the state to an empty array.
     */
    const clearReceipt = () => {
        setReceipt([]);
    };

    return (
        // The provider makes the receipt state and functions available to any child components
        <ReceiptContext.Provider value={{ receipt, addItem, removeItem, clearReceipt }}>
            {children}
        </ReceiptContext.Provider>
    );
};