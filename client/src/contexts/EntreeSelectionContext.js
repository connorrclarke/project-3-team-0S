import React, { createContext, useContext, useState } from "react";

const EntreeSelectionContext = createContext();

export const EntreeSelectionProvider = ({ children }) => {
    const [selectedEntree1, setSelectedEntree1] = useState("Entree");
    const [selectedEntree2, setSelectedEntree2] = useState("Entree");
    const [selectedEntree3, setSelectedEntree3] = useState("Entree");

    // Function to reset both entrees to the default value
    const resetEntreeSelection = () => {
        setSelectedEntree1("Entree");
        setSelectedEntree2("Entree");
        setSelectedEntree3("Entree");
    };

    return (
        <EntreeSelectionContext.Provider
            value={{
                selectedEntree1,
                selectedEntree2,
                selectedEntree3,
                setSelectedEntree1,
                setSelectedEntree2,
                setSelectedEntree3,
                resetEntreeSelection,
            }}
        >
            {children}
        </EntreeSelectionContext.Provider>
    );
};

export const useEntreeSelection = () => useContext(EntreeSelectionContext);
