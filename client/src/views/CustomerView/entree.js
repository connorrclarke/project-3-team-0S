import React from "react";
import "./CustomerView.css";

const entrees = [
    "Bourbon Chicken",
    "Orange Chicken",
    "Honey Walnut Shrimp",
    "Teriyaki Chicken",
    "Broccoli Beef",
    "Kung Pao Chicken",
    "Honey Sesame Chicken",
    "Beijing Beef",
    "Sweetfire Chicken",
    "Mushroom Chicken",
    "String Bean Chicken",
    "Black Pepper Steak"
];

const EntreeSelection = () => {
    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Select an Entree</h2>
            </div>
            <div className="button-container">
                {entrees.map((entree, index) => (
                    <button key={index} className="entree-circle">
                        {entree}
                    </button>
                ))}
            </div>
            <div className="bottom-bar">
                <button className="cancel-button">Cancel</button>
                <button className="add-button">Add</button>
            </div>
        </div>
    );
};

export default EntreeSelection;