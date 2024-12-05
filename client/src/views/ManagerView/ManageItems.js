import React, { useEffect, useState } from 'react';
import './Manager.css';
import { useNavigate } from "react-router-dom";
import AddItems from './AddItems';

//const API_URL = process.env.REACT_APP_API_URL;
const API_URL = "http://localhost:5555/api";


const ManageInventory = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [showAddItemsModal, setShowAddItemsModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${API_URL}/items`);
                // const response = await fetch('http://localhost:5555/api/items');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching items:', err);
            }
        };

        fetchItems();
    }, []);

    const handleAddInventorySubmit = async (formData) => {
        try {
            const response = await fetch(`${API_URL}/items`, {
            //const response = await fetch('http://localhost:5555/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error adding inventory item');
            }
            const newItem = await response.json();
            setItems((prevInventory) => [...prevInventory, newItem]);
        } catch (err) {
            console.error('Error adding inventory item:', err);
        }
    };

    const handleAdd = async (id) => {
        try {
            const response = await fetch(`${API_URL}/items/${id}`, {
            //const response = await fetch(`http://localhost:5555/api/items/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Available: true }),
            });

            if (!response.ok) {
                throw new Error('Failed to update item availability');
            }

            const updatedItem = await response.json();
            setItems((prevItems) =>
                prevItems.map((item) => (item.MenuItemId === id ? updatedItem.item : item))
            );
        } catch (err) {
            console.error('Error making item available:', err);
        }
    };

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`${API_URL}/items/${id}`, {
            //const response = await fetch(`http://localhost:5555/api/items/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Available: false }),
            });

            if (!response.ok) {
                throw new Error('Failed to update item availability');
            }

            const updatedItem = await response.json();
            setItems((prevItems) =>
                prevItems.map((item) => (item.MenuItemId === id ? updatedItem.item : item))
            );
        } catch (err) {
            console.error('Error making item unavailable:', err);
        }
    };


    return (
        <div className="manager-view">
            <button onClick={() => navigate('/manager')}>Return to ManagerView</button>
            <button onClick={() => setShowAddItemsModal(true)}>Add Item</button>
            {error && <div>Error fetching items: {error}</div>}

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Seasonal</th>
                        <th>Calories</th>
                        <th>Category</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.MenuItemId}>
                            <td>{item.MenuItemId}</td>
                            <td>{item.Name}</td>
                            <td>{item.Price}</td>
                            <td>{item.Seasonal ? 'Yes' : 'No'}</td>
                            <td>{item.Calories}</td>
                            <td>{item.Category}</td>
                            <td>{item.available ? 'Yes' : 'No'}</td>
                            <td>
                                <div className="options">
                                    <button className="add-item-button" onClick={() => handleAdd(item.MenuItemId)}>Add
                                    </button>


                                    <button className="rem-item-button" onClick={() => handleRemove(item.MenuItemId)}>Remove
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showAddItemsModal && (
                <AddItems
                    onClose={() => setShowAddItemsModal(false)}
                    onSubmit={handleAddInventorySubmit}
                />
            )}
        </div>
    );
};

export default ManageInventory;
