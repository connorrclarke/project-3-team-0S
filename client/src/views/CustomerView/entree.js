import React from "react";
import "./CustomerView.css";
import {useZoom, ZoomProvider} from "./ZoomContext";

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
    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);
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
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
            </div>
        </div>
    );
};

const WrappedEntreeSelection = () => (
    <ZoomProvider>
        <EntreeSelection />
    </ZoomProvider>
);

export default WrappedEntreeSelection;