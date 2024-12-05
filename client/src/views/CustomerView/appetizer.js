import React, { useState } from "react";
import "./CustomerView.css";
import {useZoom, ZoomProvider} from "./ZoomContext";

const AppetizerSelection = () => {
    const [selected, setSelected] = useState("");

    const appetizers = [
        "Egg Roll",
        "Spring Roll",
        "Cream Cheese Rangoons",
        "Apple Pie Roll",
    ];
    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);

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
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
            </div>
        </div>
    );
};

const WrappedAppetizer = () => (
    <ZoomProvider>
        <AppetizerSelection />
    </ZoomProvider>
);

export default WrappedAppetizer;