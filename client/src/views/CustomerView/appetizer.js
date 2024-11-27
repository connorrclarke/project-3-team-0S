import React, { useState } from "react";
import "./CustomerView.css";

const AppetizerSelection = () => {
    const [selected, setSelected] = useState("");

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

    return (
        <div className="customer-layout">
            <div className="title-bar">
                <h1>Select Your Appetizer</h1>
            </div>
            <div className="button-container">
                {appetizers.map((item) => (
                    <button
                        key={item}
                        className={`category-circle ${
                            selected === item ? "entree-circle" : ""
                        }`}
                        onClick={() => handleSelect(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className="bottom-bar">
                <button className="cancel-button" onClick={() => setSelected("")}>
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