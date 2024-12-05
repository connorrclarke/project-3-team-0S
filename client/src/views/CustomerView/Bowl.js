import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './CustomerView.css';
import {useZoom, ZoomProvider} from "./ZoomContext";

const Bowl = () => {
    const navigate = useNavigate();
    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);
    // Handling the "Add" and "Cancel" button actions
    const handleCancel = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    const handleAdd = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    return (
        <div className="bowl-layout">
            {/* Title bar */}
            <div className="title-bar">
                <h1>Bowl</h1>
            </div>

            {/* Middle section with two circle buttons */}
            <div className="middle-section">
                <div className="category-description">
                    <p>Choose your sides:</p>
                    <button className="sides-circle">Sides</button>
                </div>
                <div className="category-description">
                    <p>Choose your entrees:</p>
                    <button className="entree-circle">Entree</button>
                </div>
            </div>

            {/* Bottom bar with "Cancel" and "Add" buttons */}
            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleAdd} className="add-button">Add</button>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
            </div>
        </div>
    );
};

const WrappedBowl = () => (
    <ZoomProvider>
        <Bowl />
    </ZoomProvider>
);

export default WrappedBowl;
