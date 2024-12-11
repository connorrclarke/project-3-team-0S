/**
 * EntreeSelectionContext Component
 *
 * This component manages the selection of entrees. It provides functionality 
 * to select and reset the entrees through context, allowing different components 
 * to access and update the currently selected entrees.
 *
 * @author Siddhi Mittal
 */

import React, { createContext, useContext, useState } from "react";

// Create context to manage the selection of entrees
const EntreeSelectionContext = createContext();

/**
 * EntreeSelectionProvider Component
 *
 * This provider component wraps the application or parts of it, providing access 
 * to the selected entrees and a function to reset them. It holds the state for 
 * three different entrees (selectedEntree1, selectedEntree2, selectedEntree3) 
 * and offers a way to reset them to their default value ("Entree").
 *
 * @param {ReactNode} children - The child components that will consume the entree selection context.
 */
export const EntreeSelectionProvider = ({ children }) => {
    // State to store the selection for three entrees, initialized to "Entree" as default
    const [selectedEntree1, setSelectedEntree1] = useState("Entree");
    const [selectedEntree2, setSelectedEntree2] = useState("Entree");
    const [selectedEntree3, setSelectedEntree3] = useState("Entree");

    /**
     * resetEntreeSelection Function
     *
     * Resets all three entrees to their default value ("Entree").
     */
    const resetEntreeSelection = () => {
        setSelectedEntree1("Entree");
        setSelectedEntree2("Entree");
        setSelectedEntree3("Entree");
    };

    return (
        // The provider makes the selected entrees and reset function available to child components
        <EntreeSelectionContext.Provider
            value={{
                selectedEntree1,
                setSelectedEntree1,
                selectedEntree2,
                setSelectedEntree2,
                selectedEntree3,
                setSelectedEntree3,
                resetEntreeSelection
            }}
        >
            {children}
        </EntreeSelectionContext.Provider>
    );
};

/**
 * useEntreeSelection Hook
 *
 * This custom hook provides an easy way for components to access the entree selection context. 
 * It returns the current values and functions for managing the entree selections.
 *
 * @returns {Object} The context value containing selected entrees and the function to reset them.
 */
export const useEntreeSelection = () => useContext(EntreeSelectionContext);