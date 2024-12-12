import React, { useEffect, useState } from 'react';
import './Manager.css';
import { useNavigate } from "react-router-dom";
import AddInventory from './AddInventory';  // A component for adding new inventory items

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = "http://localhost:5555/api";

/**
 * @function ManageInventory
 * @description Component for managing inventory, allowing addition and reset of inventory items.
 * @returns {JSX.Element}
 */
const ManageInventory = () => {
    const [inventory, setInventory] = useState([]);  // Inventory state to store list of inventory items
    const [error, setError] = useState(null); // Error state to handle any issues during API fetch
    const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);  // State to toggle the AddInventory modal
    const navigate = useNavigate(); // Hook for navigating to different routes

    /**
     * @function fetchInventory
     * @description Fetches inventory data from the backend API.
     * @returns {Promise<void>}
     */
    const fetchInventory = async () => {
        try {
            const response = await fetch(`${API_URL}/inventory`);  // Use API_URL here
            //const response = await fetch('http://localhost:5555/api/inventory');  // API endpoint to fetch inventory data
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setInventory(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching inventory:', err);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    /**
     * @function handleAddInventorySubmit
     * @description Submits a new inventory item to the backend API.
     * @param {Object} formData - The details of the inventory item.
     * @returns {Promise<void>}
     */
    const handleAddInventorySubmit = async (formData) => {
        try {
            const response = await fetch(`${API_URL}/inventory`, {
            //const response = await fetch('http://localhost:5555/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error adding inventory item');
            }
            const newItem = await response.json();
            setInventory((prevInventory) => [...prevInventory, newItem]);
        } catch (err) {
            console.error('Error adding inventory item:', err);
        }
    };

    /**
     * @function handleResetInventory
     * @description Resets the inventory to its initial state.
     * @returns {Promise<void>}
     */
    const handleResetInventory = async () => {
        try {
            const response = await fetch(`${API_URL}/resetInventory`, {
            //const response = await fetch(`http://localhost:5555/api/resetInventory`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Error resetting inventory');
            }
            await fetchInventory(); // Refresh the inventory list after resetting
            alert('Inventory has been reset to initial values.');
        } catch (err) {
            console.error('Error resetting inventory:', err);
            alert('Failed to reset inventory.');
        }
    };

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/manager')}>Return to ManagerView</button>
            <button onClick={() => setShowAddInventoryModal(true)}>Add Inventory Item</button>
            <button onClick={handleResetInventory}>Reset Inventory</button>
            {error && <div>Error fetching inventory: {error}</div>}
            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Quantity Units</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventory.map((item) => (
                        <tr key={item.InventoryId}>
                            <td>{item.InventoryId}</td>
                            <td>{item.Ingredient}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.QuantityUnit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showAddInventoryModal && (
                <AddInventory
                    onClose={() => setShowAddInventoryModal(false)}
                    onSubmit={handleAddInventorySubmit}
                />
            )}
        </div>
    );
};

export default ManageInventory;
