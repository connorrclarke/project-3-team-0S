import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSideSelection } from "../../contexts/SideSelectionContext";
import "./CustomerView.css";

const SelectSides = () => {
    const [localSelectedSide, setLocalSelectedSide] = useState(null);
    const { setSelectedSide } = useSideSelection();
    const navigate = useNavigate();

    const sides = ["Chow Mein", "Fried Rice", "White Rice", "Super Greens"];
    
    const handleAdd = () => {
        if (localSelectedSide) {
            setSelectedSide(localSelectedSide); // Update the shared state
            navigate(-1); // Go back to the previous page
        } else {
            alert("Please select a side!");
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
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
                        className={`sides-circle ${localSelectedSide === side ? "selected" : ""}`}
                        onClick={() => setLocalSelectedSide(side)}
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