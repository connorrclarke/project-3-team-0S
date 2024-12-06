import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./CustomerView.css";
import { useZoom, ZoomProvider } from "./ZoomContext";
import Drink from "./Drink";

const DrinkSelection = () => {
    const [selected, setSelected] = useState("");
    const [drinks, setDrinks] = useState([]);
    const navigate = useNavigate();
    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);

    const API_URL = process.env.REACT_APP_API_URL;
    // const API_URL = "http://localhost:5555/api";

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/drinks`);
                if (!response.ok) throw new Error('Failed to fetch drinks.');

                const data = await response.json();
                setDrinks([...drinks, ...data.filter((item) => item.available).map((item) => item.Name)]);
            } catch (error) {
                console.error('Error fetching drinks:', error);
            }
        };

        fetchDrinks();
    }, []);

    const handleSelect = (drink) => {
        setSelected(drink);
    };

    const handleAdd = () => {
        if (selected) {
            navigate('/customer', { state: { newItem: { name: selected, price: 2.50 } } });
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
                        {item}
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

const WrappedDrinkSelection = () => (
    <ZoomProvider>
        <DrinkSelection />
    </ZoomProvider>
);

export default WrappedDrinkSelection;


