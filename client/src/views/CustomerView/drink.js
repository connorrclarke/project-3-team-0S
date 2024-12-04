import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CustomerView.css";

const DrinkSelection = () => {
    const [selected, setSelected] = useState("");
    const navigate = useNavigate(); // Hook for navigating between pages

    const drinks = ["Fountain", "Mexican Coke", "Apple Juice", "Water Bottle"];

    const handleSelect = (drink) => {
        setSelected(drink);
    };

    const handleAdd = () => {
        if (selected) {
            alert(`You added: ${selected}`);
        } else {
            alert("Please select a drink!");
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
                <h1>Select Your Drink</h1>
            </div>
            <div className="button-container">
                {drinks.map((item) => (
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

export default DrinkSelection;