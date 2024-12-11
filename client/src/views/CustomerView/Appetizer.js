/**
 * AppetizerSelection Component
 *
 * This component allows users to select an appetizer from a list of available options.
 * It includes functionality for zooming in and out of the page for accessibility and integrates
 * with a shared receipt context to track selected items.
 * 
 * @author Siddhi Mittal and Meenalika Singh
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./CustomerView.css";
import {useZoom, ZoomProvider} from "./ZoomContext";
import { useReceipt } from "../../contexts/ReceiptContext";

const AppetizerSelection = () => {
    const [selected, setSelected] = useState(null); // State to track the selected appetizer
    const [appetizers, setAppetizers] = useState([]); // State to store available appetizers
    const navigate = useNavigate(); // Hook for navigation between pages
    const { addItem } = useReceipt(); // Receipt context to add items to the receipt

    const { zoomLevel, updateZoomLevel } = useZoom(); // Access zoom level and update functions from context
    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2)); // Handles zoom in functionality with a maximum zoom level of 2
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));// Handles zoom out functionality with a minimum zoom level of 0.5
    const handleResetZoom = () => updateZoomLevel(1); // Resets zoom to the default level (1)
    
    const API_URL = process.env.REACT_APP_API_URL; // Base API URL from enviroment variables
    // const API_URL = "http://localhost:5555/api";

    /**
     * useEffect to fetch appetizer data from the API on component mount.
     * Filters the fetched data to include only available appetizers.
     */
    useEffect(() => {
        const fetchAppetizers = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/appetizers`);
                if (!response.ok) throw new Error('Failed to fetch appetizers.');

                const data = await response.json();
                setAppetizers(data.filter((item) => item.available).map((item) => ({
                    name: item.Name,
                    price: item.Price || 1.75,  // Default price if not specified
                })));
            } catch (error) {
                console.error('Error fetching appetizers:', error);
            }
        };

        fetchAppetizers();
    }, []);

    /**
     * Handles the selection of an appetizer.
     * Updates the `selected` state with the clicked appetizer.
     */
    const handleSelect = (appetizer) => {
        setSelected(appetizer);
    };

    /**
     * Handles the "Add" button click.
     * Adds the selected appetizer to the receipt context and navigates to the CustomerView page.
     * If no appetizer is selected, it displays an alert.
     */
    const handleAdd = () => {
        if (selected) {
            const item = {
                name: selected.name,
                price: selected.price,
                sides: null,  // Ensure sides is null for appetizers
                entrees: null, // Ensure entrees is null for appetizers
            };
            addItem(item);
            navigate('/customer');
        } else {
            alert("Please select an appetizer!");
        }
    };

    /**
     * Handles the "Cancel" button click by navigating back to the CustomerView page
     * without saving the current selection.
     */
    const handleCancel = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    return (
        <div className="customer-layout">
            <div className="title-bar">
                <h1>Select Your Appetizer</h1>
            </div>
            <div className="button-container">
                {appetizers.map((item) => (
                    <button
                        key={item.name}
                        className={`sides-circle ${selected && selected.name === item.name ? "selected" : ""}`}
                        onClick={() => handleSelect(item)}
                    >
                        {item.name}
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

// Wraps the AppetizerSelection component with the ZoomProvider for zoom context
const WrappedAppetizerSelection = () => (
    <ZoomProvider>
        <AppetizerSelection />
    </ZoomProvider>
);

export default WrappedAppetizerSelection;
