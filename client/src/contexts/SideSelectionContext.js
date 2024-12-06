import React, { createContext, useContext, useState } from "react";

const SideSelectionContext = createContext();

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

export const useSideSelection = () => useContext(SideSelectionContext);