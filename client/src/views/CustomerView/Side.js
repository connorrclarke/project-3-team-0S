import React, { useState } from "react";
import "./CustomerView.css";

const SelectSides = () => {
    const [selectedSides, setSelectedSides] = useState([]);

    const sides = ["Chow Mein", "Fried Rice", "White Rice", "Super Greens"];
    const toggleSide = (side) => {
        if (selectedSides.includes(side)) {
            setSelectedSides(selectedSides.filter((s) => s !== side));
        } else if (selectedSides.length < 2) {
            setSelectedSides([...selectedSides, side]);
        }
    };

    const handleAdd = () => {
        if (selectedSides.length === 0) {
            alert("Please select at least one side.");
        } else {
            alert(`Added: ${selectedSides.join(", ")}`);
        }
    };

    const handleCancel = () => {
        setSelectedSides([]);
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Select Your Side(s)</h2>
            </div>
            <div className="middle-section">
                {sides.map((side) => (
                    <button
                        key={side}
                        className={`sides-circle ${
                            selectedSides.includes(side) ? "selected" : ""
                        }`}
                        onClick={() => toggleSide(side)}
                    >
                        {side}
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

export default SelectSides;