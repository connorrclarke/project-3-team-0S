import React, {} from 'react';
import './CustomerView.css';

function Biggerplate() {
    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h1>Bigger Plate</h1>
            </div>

            <div className="middle-section">
                <div className="category-description">
                    <p>Select your side:</p>
                    <div className="sides-circle">
                        <span>Sides</span>
                    </div>
                </div>

                <div className="category-description">
                    <p>Select your 1st entree:</p>
                    <div className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>

                <div className="category-description">
                    <p>Select your 2nd entree:</p>
                    <div className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>

                <div classNae="category-description">
                    <p>Select your 3rd entree:</p>  
                    <div className="entree-circle">
                        <span>Entree</span>
                    </div>
                </div>
            </div>

            <div className="bottom-bar">
                <button className="cancel-button">Cancel</button>
                <button className="add-button">Add</button>
            </div>
        </div>
    );
}

export default Biggerplate;