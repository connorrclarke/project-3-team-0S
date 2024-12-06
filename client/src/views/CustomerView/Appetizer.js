import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./CustomerView.css";

const AppetizerSelection = () => {
    const [selected, setSelected] = useState("");
    const [appetizers, setAppetizers] = useState([]);
    const navigate = useNavigate();
    
    const API_URL = process.env.REACT_APP_API_URL;
    // const API_URL = "http://localhost:5555/api";

    useEffect(() => {
        const fetchAppetizers = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/appetizers`);
                if (!response.ok) throw new Error('Failed to fetch appetizers.');

                const data = await response.json();
                setAppetizers([...appetizers, ...data.filter((item) => item.available).map((item) => item.Name)]);
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
            alert(`You added: ${selected}`);
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
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default AppetizerSelection;
