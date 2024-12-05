import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';

function Biggerplate() {
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

    // Navigates to sides page
    const goToSide = () => {
        navigate('/sides');
    };

    // Navigates to entree page
    const goToEntree = () => {
        navigate('/entree');
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h1>Bigger Plate</h1>
            </div>

            <div className="middle-section">
                <div className="category-description">
                    <p>Select your side:</p>
                    <div onClick={goToSide} className="sides-circle">
                        <span>Sides</span>
                    </div>
                </div>

                <div className="category-description">
                    <p>Select your 1st entree:</p>
                    <div onClick={goToEntree} className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>

                <div className="category-description">
                    <p>Select your 2nd entree:</p>
                    <div onClick={goToEntree} className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>

                <div classNae="category-description">
                    <p>Select your 3rd entree:</p>  
                    <div onClick={goToEntree} className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>
            </div>

            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleAdd} className="add-button">Add</button>
            </div>
        </div>
    );
}

export default Biggerplate;