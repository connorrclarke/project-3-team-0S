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
                    <div className="sides-circle">
                        <span>Sides</span>
                    </div>
                    <p>Select your Sides</p>
                </div>

                <div className="category-description">
                    <div className="entree-circle">
                        <span>Entree</span>
                    </div>
                    <p>Select your 1st Entree</p>
                </div>

                <div className="category-description">
                    <div className="entree-circle">
                        <span>Entree</span>
                    </div>
                    <p>Select your 2nd Entree</p>
                </div>

                <div classNae="category-description">
                    <div className="entree-circle">
                        <span>Entree</span>
                    </div>
                    <p>Select your 3rd Entree</p>
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