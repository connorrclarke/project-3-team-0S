import React, { useState } from "react";
import "./CustomerView.css";

const DrinkSelection = () => {
    const [selected, setSelected] = useState("");

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

    return (
        <div className="customer-layout">
            <div className="title-bar">
                <h1>Select Your Drink</h1>
            </div>
            <div className="button-container">
                {drinks.map((item) => (
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

export default DrinkSelection;