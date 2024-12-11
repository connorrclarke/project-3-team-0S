/**
 * SelectSides Component
 *
 * This component allows users to select a side dish from the list of available options.
 * It includes functionality for zooming in and out of the page to enhance accessibility.
 * The component fetches side data from an API and updates the selection in a shared context.
 * 
 * @author Siddhi Mittal and Meenalika Singh
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSideSelection } from "../../contexts/SideSelectionContext";
import "./CustomerView.css";
import {useZoom, ZoomProvider} from "./ZoomContext";

const SelectSides = () => {
    const [sides, setSides] = useState([]); // State to store available sides
    const [localSelectedSide, setLocalSelectedSide] = useState(null); // State to track locally selected side
    const { setSelectedSide } = useSideSelection(); // Context for managing the selected side
    const navigate = useNavigate(); // Hook for navigation
    
    const { zoomLevel, updateZoomLevel } = useZoom(); // Access zoom level and update functions from context
    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2)); // Handles zoom in functionality with a maximum zoom level of 2
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));// Handles zoom out functionality with a minimum zoom level of 0.5
    const handleResetZoom = () => updateZoomLevel(1); // Resets zoom to the default level (1)

    const API_URL = process.env.REACT_APP_API_URL;  // Base API URL from environment variables
    //const API_URL = "http://localhost:5555/api";

    /**
     * useEffect to fetch side dishes from the API on component mount.
     * Filters the fetched data to include only available sides.
     */
    useEffect(() => {
        const fetchSides = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/sides`);
                if (!response.ok) throw new Error('Failed to fetch sides.');

                const data = await response.json();
                setSides([...sides, ...data.filter((item) => item.available).map((item) => item.Name)]);
            } catch (error) {
                console.error('Error fetching sides:', error);
            }
        };

        fetchSides();
    }, []);

    /**
     * Handles the "Add" button click.
     * Saves the selected side to the shared context and navigates back to the previous page.
     */
    const handleAdd = () => {
        if (localSelectedSide) {
            setSelectedSide(localSelectedSide);
            navigate(-1);
        } else {
            alert("Please select a side!");
        }
    };

    /**
     * Handles the "Cancel" button click.
     * Simply navigates back to the previous page without saving any selection.
     */
    const handleCancel = () => {
        navigate(-1); 
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
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
};

// Wraps the SelectSides component with the ZoomProvider for zoom context
const WrappedSelectSides = () => (
    <ZoomProvider>
        <SelectSides/>
    </ZoomProvider>
);

export default WrappedSelectSides;
