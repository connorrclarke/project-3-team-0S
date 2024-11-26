import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';

const Bowl = () => {
    const navigate = useNavigate();

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
                <button onClick={handleAdd} className="add-button" >Add</button>
            </div>
        </div>
    );
};

export default Bowl;
