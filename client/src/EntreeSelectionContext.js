import React, { createContext, useContext, useState } from "react";

const EntreeSelectionContext = createContext();

export const EntreeSelectionProvider = ({ children }) => {
    const [selectedEntree, setSelectedEntree] = useState("Entree");

    // Function to reset the entree to the default value
    const resetEntreeSelection = () => setSelectedEntree("Entree");

    return (
        <EntreeSelectionContext.Provider value={{ selectedEntree, setSelectedEntree, resetEntreeSelection }}>
            {children}
        </EntreeSelectionContext.Provider>
    );
};

export const useEntreeSelection = () => useContext(EntreeSelectionContext);
