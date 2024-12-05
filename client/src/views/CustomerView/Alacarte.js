/**
 * A la carte Component
 *
 * This component represents the page where customers can customize their alacarte order.
 * It allows users to select sides and entrees from the menu and provides options
 * to either add the selected items to their order or cancel and return to the main view.
 *
 * @author Siddhi Mittal
 */
import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';

// List of side items available in the menu
const sides = [
    "Chow Mein", 
    "Fried Rice", 
    "White Rice", 
    "Super Greens"
];

// List of entree items available in the menu
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

const Alacarte = () => {
    const navigate = useNavigate(); // Hook for navigating between pages

    /**
     * Handles the "Cancel" button click by navigating back to the CustomerView page
     * without saving the current selection.
     */
    const handleCancel = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    /**
     * Handles the "Add" button click by navigating back to the CustomerView page.
     * (Future functionality could include saving the current selection before navigating.)
     */
    const handleAdd = () => {
        navigate('/customer'); // Redirecting back to the CustomerView page
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Each Item Will be Added Individually to the Receipt</h2>
            </div>
            <div className="button-alacarte-container">
                {/* Sides on the first line */}
                <div className="sides-container">
                    {sides.map((side, index) => (
                        <button key={index} className="sides-carte-circle">
                            {side}
                        </button>
                    ))}
                </div>
                
                {/* Entrees in a grid on the next lines */}
                <div className="entrees-container">
                    {entrees.map((entree, index) => (
                        <button key={index} className="entree-carte-circle">
                            {entree}
                        </button>
                    ))}
                </div>

            </div>
            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleAdd} className="add-button">Add</button>
            </div>
        </div>
    );
};

export default Alacarte;