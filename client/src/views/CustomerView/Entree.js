import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
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
const importAll = (requireContext) => {
    const images = {};
    requireContext.keys().forEach((key) => {
        const fileName = key.replace("./", "").replace(/\.(png|jpe?g|gif)$/i, "");
        images[fileName] = requireContext(key);
    });
    return images;
};

const images = importAll(require.context("./Pictures", false, /\.(png|jpe?g|gif)$/));

const EntreeSelection = () => {
    const navigate = useNavigate();
    const { selectedEntree, setSelectedEntree } = useEntreeSelection();

    // Select one entree and update the selection
    const selectEntree = (entree) => {
        setSelectedEntree([entree]); // Only allow one entree at a time
    };

    // Add selected entrees and navigate back
    const handleAdd = () => {
        if (selectedEntree.length === 0) {
            alert("Please select at least one entree.");
        } else {
            navigate(-1); // Go back to the Bowl page
        }
    };
    
    const handleCancel = () => {
        setSelectedEntree([]); // Clear the selection
        navigate(-1); // Go back to the previous page
    };
    

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Select an Entree</h2>
            </div>
            <div className="button-container">
                {entrees.map((entree, index) => (
                    <button
                        style={{
                            backgroundImage: `url(${images[entree]})`,
                        }}
                        key={index}
                        className={`entree-circle ${
                            selectedEntree.includes(entree) ? "selected" : ""
                        }`}
                        onClick={() => selectEntree(entree)}
                    >
                        {entree}
                    </button>


                ))}
            </div>
            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleAdd} className="add-button">Add</button>
            </div>
        </div>
    );
};

export default EntreeSelection;
