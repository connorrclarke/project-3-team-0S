import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import AddInventory from './AddInventory';  // A component for adding new inventory items

/**
 * A component for managing the inventory, displaying a list of inventory items and allowing new items to be added.
 *
 * @component
 * @example
 * // Usage Example:
 * <ManageInventory />
 * @author Luke Lopez
 * @returns {JSX.Element} The rendered ManageInventory component.
 */
const ManageInventory = () => {
    const [inventory, setInventory] = useState([]);  // Inventory state to store list of inventory items
    const [error, setError] = useState(null); // Error state to handle any issues during API fetch
    const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);  // State to toggle the AddInventory modal
    const navigate = useNavigate(); // Hook for navigating to different routes

    /**
     * Fetches the inventory items from the backend API when the component mounts.
     * Handles errors if the fetch operation fails.
     *
     * @async
     * @function
     * @returns {void}
     */
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/inventory');  // API endpoint to fetch inventory data
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setInventory(data); // Update inventory state with fetched data
            } catch (err) {
                setError(err.message); // Set error message if fetch fails
                console.error('Error fetching inventory:', err);
            }
        };

        fetchInventory();
    }, []); // Empty dependency array means this will run only once, when the component mounts

    /**
     * Handles the submission of a new inventory item through the AddInventory component.
     * Sends the new inventory data to the backend API and updates the inventory list.
     *
     * @async
     * @function
     * @param {Object} formData - The data for the new inventory item.
     * @returns {void}
     */
    const handleAddInventorySubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Send new inventory item data as JSON in the request body
            });
            if (!response.ok) {
                throw new Error('Error adding inventory item');
            }
            const newItem = await response.json();
            setInventory((prevInventory) => [...prevInventory, newItem]); // Add the new item to the inventory state
        } catch (err) {
            console.error('Error adding inventory item:', err);
        }
    };

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/manager')}>Return to ManagerView</button>
            <button onClick={() => setShowAddInventoryModal(true)}>Add Inventory Item</button>
            {error && <div>Error fetching inventory: {error}</div>}  {/* Show error message if fetch fails */}

            {/* Add a div wrapper for the table with scrollable styles */}
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
                            <td>{item.Ingredient }</td>
                            <td>{item.Quantity}</td>
                            <td>{item.QuantityUnit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showAddInventoryModal && (
                <AddInventory
                    onClose={() => setShowAddInventoryModal(false)}  // Close the modal
                    onSubmit={handleAddInventorySubmit}  // Handle form submission for adding new inventory item
                />
            )}
        </div>
    );
};

export default ManageInventory;
