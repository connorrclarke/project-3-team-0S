import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [selectedEntrees, setSelectedEntrees] = useState([]);

    // Toggle selection of an entree
    const toggleEntree = (entree) => {
        if (selectedEntrees.includes(entree)) {
            setSelectedEntrees(selectedEntrees.filter((e) => e !== entree)); // Remove from selection
        } else {
            setSelectedEntrees([...selectedEntrees, entree]); // Add to selection
        }
    };

    const handleAdd = () => {
        if (EntreeSelection.length === 0) {
            alert("Please select at least one entree.");
        } else {
            alert(`Added: ${EntreeSelection.join(", ")}`);
        }
    };
    
    const handleCancel = () => {
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
                        key={index}
                        className={`entree-circle ${
                            selectedEntrees.includes(entree) ? "selected" : ""
                        }`}
                        onClick={() => toggleEntree(entree)}
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
