/**
 * DrinkSelection Component
 *
 * This component allows users to select a drink from a list of available options.
 * It includes functionality for zooming in and out of the page for accessibility 
 * and integrates with a shared receipt context to track selected items.
 * 
 * @author Siddhi Mittal and Meenalika Singh
 */

import React, { useState, useEffect } from "react"; 
import { useNavigate } from 'react-router-dom'; 
import "./CustomerView.css"; 
import { useReceipt } from "../../contexts/ReceiptContext";
import { useZoom, ZoomProvider } from "./ZoomContext";

const DrinkSelection = () => {
    const [selected, setSelected] = useState(""); // State to track the selected drink
    const [drinks, setDrinks] = useState([]); // State to store available drinks
    const navigate = useNavigate(); // Hook for navigation between pages
    const { addItem } = useReceipt(); // Access addItem from context

    const { zoomLevel, updateZoomLevel } = useZoom(); // Access zoom level and update functions from context
    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2)); // Handles zoom in functionality with a maximum zoom level of 2
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));// Handles zoom out functionality with a minimum zoom level of 0.5
    const handleResetZoom = () => updateZoomLevel(1); // Resets zoom to the default level (1)

    const API_URL = process.env.REACT_APP_API_URL; // Base API URL from enviroment variables
    // const API_URL = "http://localhost:5555/api";

    /**
     * useEffect to fetch drink data from the API on component mount.
     * Filters the fetched data to include only available drinks.
     */
    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/drinks`);
                if (!response.ok) throw new Error('Failed to fetch drinks.');

                const data = await response.json();
                setDrinks(data.filter((item) => item.available).map((item) => ({
                    name: item.Name,
                    price: item.Price || 2.50, // Use fetched price or default
                    size: item.Size || "Regular", // Example of additional detail
                })));
            } catch (error) {
                console.error('Error fetching drinks:', error);
            }
        };

        fetchDrinks();
    }, []);

    /**
     * Handles the selection of a drink.
     * Updates the `selected` state with the clicked drink.
     */
    const handleSelect = (drink) => {
        setSelected(drink);
    };

    const handleAdd = () => {
        if (selected) {
            const item = {
                name: selected.name,
                price: selected.price,
                sides: null,   // Ensure sides is null for drinks
                entrees: null, // Ensure entrees is null for drinks
            };
            addItem(item);
            navigate('/customer');
        } else {
            alert("Please select a drink!");
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
                <h1>Select Your Drink</h1>
            </div>
            <div className="button-container">
                {drinks.map((item) => (
                    <button
                        key={item}
                        className={`sides-circle ${
                            selected === item ? "selected" : ""
                        }`}
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

// Wraps the DrinkSelection component with the ZoomProvider for zoom context
const WrappedDrinkSelection = () => (
    <ZoomProvider>
        <DrinkSelection />
    </ZoomProvider>
);

export default WrappedDrinkSelection;
