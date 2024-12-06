import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';

const Alacarte = () => {
    const navigate = useNavigate();
    const [sides, setSides] = useState([]);
    const [entrees, setEntrees] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;
    // const API_URL = "http://localhost:5555/api";

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const responseSides = await fetch(`${API_URL}/menu-items/sides`);
                const responseEntrees = await fetch(`${API_URL}/menu-items/entrees`);

                if (!responseSides.ok || !responseEntrees.ok) throw new Error('Failed to fetch menu items.');

                const sidesData = await responseSides.json();
                const entreesData = await responseEntrees.json();

                setSides(sidesData.filter((item) => item.available).map((item) => item.Name));
                setEntrees(entreesData.filter((item) => item.available).map((item) => item.Name));
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleCancel = () => navigate('/customer');
    const handleAdd = () => navigate('/customer');

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