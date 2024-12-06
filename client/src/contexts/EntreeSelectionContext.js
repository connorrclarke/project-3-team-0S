import React, { createContext, useContext, useState } from "react";

// Create context for entree selections
const EntreeSelectionContext = createContext();

export const EntreeSelectionProvider = ({ children }) => {
    const [selectedEntree1, setSelectedEntree1] = useState("Entree");
    const [selectedEntree2, setSelectedEntree2] = useState("Entree");
    const [selectedEntree3, setSelectedEntree3] = useState("Entree");

    // Function to reset all entrees
    const resetEntreeSelection = () => {
        setSelectedEntree1("Entree");
        setSelectedEntree2("Entree");
        setSelectedEntree3("Entree");
    };

    return (
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

export const useEntreeSelection = () => useContext(EntreeSelectionContext);

