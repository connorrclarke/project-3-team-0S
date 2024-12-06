import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./CustomerView.css";
import { useReceipt } from "../../contexts/ReceiptContext";

const AppetizerSelection = () => {
    const [selected, setSelected] = useState(null);
    const [appetizers, setAppetizers] = useState([]);
    const navigate = useNavigate();
    const { addItem } = useReceipt();

    const API_URL = process.env.REACT_APP_API_URL;
    // const API_URL = "http://localhost:5555/api";

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

    const handleSelect = (appetizer) => {
        setSelected(appetizer);
    };

    const handleAdd = () => {
        if (selected) {
            // Check if the item is already in the receipt before adding it
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
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default AppetizerSelection;
