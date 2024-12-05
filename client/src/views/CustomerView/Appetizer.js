import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CustomerView.css";

const AppetizerSelection = () => {
    const [selected, setSelected] = useState("");
    const navigate = useNavigate(); // Hook for navigating between pages

    const appetizers = [
        "Egg Roll",
        "Spring Roll",
        "Cream Cheese Rangoons",
        "Apple Pie Roll",
    ];

    const handleSelect = (appetizer) => {
        setSelected(appetizer);
    };

    const handleAdd = () => {
        if (selected) {
            alert(`You added: ${selected}`);
        } else {
            alert("Please select an appetizer!");
        }
    };

    /**
     * Handles the "Cancel" button click by navigating back to the CustomerView page
     * without saving the current selection.
     */
    const handleCancel = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    return (
        <div className="customer-layout">
            <div className="title-bar">
                <h1>Select Your Appetizer</h1>
            </div>
            <div className="button-container">
                {appetizers.map((item) => (
                    <button
                        key={item}
                        className={`sides-circle ${
                            selected === item ? "selected" : ""
                        }`}
                        onClick={() => handleSelect(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className="bottom-bar">
                <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default AppetizerSelection;
