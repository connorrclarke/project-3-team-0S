/**
 * Bowl Component
 *
 * This component represents the page where customers can customize their "Bowl" order.
 * It allows users to select sides and entrees for their bowl and provides options
 * to either add the selection to their order or cancel and return to the main view.
 *
 * @author Siddhi Mittal
 */
import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';

const Bowl = () => {
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
                <button onClick={handleAdd} className="add-button" >Add</button>
            </div>
        </div>
    );
};

export default Bowl;
