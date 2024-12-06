import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReceipt } from '../../contexts/ReceiptContext'; // Import the custom hook
import './CustomerView.css';

const Alacarte = () => {
    const navigate = useNavigate();
    const { addItem } = useReceipt();  // Access addItem from ReceiptContext
    const [sides, setSides] = useState([]);
    const [entrees, setEntrees] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);  // Track the selected item (side or entree)
    const [itemType, setItemType] = useState(null);  // To differentiate side vs entree
    const [price, setPrice] = useState(0);  // Price based on selected item
    const [selectedButton, setSelectedButton] = useState(null); // Track selected button for styling

    const API_URL = process.env.REACT_APP_API_URL;

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

    const handleAdd = () => {
        if (!selectedItem) {
            alert("Please select a side or an entree");
            return;
        }

        // Create the item object
        const item = {
            name: selectedItem,
            price: price,  // Set the selected item's price
            type: itemType,  // Type will be either "side" or "entree"
        };

        // Add the item to the receipt
        addItem(item);  // Use the addItem function from ReceiptContext

        // Reset selections after adding
        setSelectedItem(null);
        setItemType(null);
        setPrice(0);
        setSelectedButton(null); // Reset the selected button

        navigate('/customer');  // Redirect to CustomerView
    };

    const handleItemSelect = (item, type, price, buttonType) => {
        setSelectedItem(item);  // Set selected item (side or entree)
        setItemType(type);  // Set item type (either "side" or "entree")
        setPrice(price);  // Set price based on item type
        setSelectedButton(buttonType);  // Update the selected button
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
                        <button
                            key={index}
                            className={`sides-carte-circle ${selectedButton === `side-${side}` ? "selected" : ""}`}
                            onClick={() => handleItemSelect(side, "side", 4.40, `side-${side}`)}  // Assign price for sides
                        >
                            {side}
                        </button>
                    ))}
                </div>
                
                {/* Entrees in a grid on the next lines */}
                <div className="entrees-container">
                    {entrees.map((entree, index) => (
                        <button
                            key={index}
                            className={`entree-carte-circle ${selectedButton === `entree-${entree}` ? 'selected' : ""}`}
                            onClick={() => handleItemSelect(entree, "entree", 5.20, `entree-${entree}`)}  // Assign price for entrees
                        >
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

