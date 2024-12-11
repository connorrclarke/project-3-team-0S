/**
 * SideSelectionContext Component
 *
 * This component manages the selection of sides for a dish. It provides functionality
 * to update, reset, and access the currently selected side through context. This is 
 * used in multiple components to allow the user to choose a side for their bowl or dish.
 *
 * @author Siddhi Mittal
 */

import React, { createContext, useContext, useState } from "react";

// Create a Context for the side selection, which will allow sharing the side selection state
// across different components.
const SideSelectionContext = createContext();

/**
 * SideSelectionProvider Component
 *
 * This provider component wraps around other components that need access to the selected side
 * or the ability to reset the side. It holds the state of the currently selected side and
 * provides a method to reset the selection.
 *
 * @param {ReactNode} children - The child components that will consume the side selection context.
 */
export const SideSelectionProvider = ({ children }) => {
    const [selectedSide, setSelectedSide] = useState("Sides");

    // Function to reset the side to the default value
    const resetSideSelection = () => setSelectedSide("Sides");

    return (
        <SideSelectionContext.Provider value={{ selectedSide, setSelectedSide, resetSideSelection }}>
            {children}
        </SideSelectionContext.Provider>
    );
};

/**
 * useSideSelection Hook
 *
 * This custom hook is used to access the SideSelectionContext in any child component.
 * It provides easy access to the selected side, the function to set the side, 
 * and the function to reset the side selection.
 *
 * @returns {Object} The context value containing selectedSide, setSelectedSide, and resetSideSelection.
 */
export const useSideSelection = () => useContext(SideSelectionContext);