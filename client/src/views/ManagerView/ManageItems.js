import React, { useEffect, useState } from 'react';
import './Manager.css';
import { useNavigate } from "react-router-dom";
import AddItems from './AddItems';

/**
 * A component for managing the inventory, displaying a list of inventory items and allowing new items to be added.
 *
 * @component
 * @example
 * // Usage Example:
 * <ManageItems />
 * @author Luke Lopez
 * @returns {JSX.Element} The rendered ManageItems component.
 */
const ManageInventory = () => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null); // Error state to handle any issues during API fetch
    const [showAddItemsModal, setShowAddItemsModal] = useState(false);  // State to toggle the AddInventory modal
    const navigate = useNavigate(); // Hook for navigating to different routes

    /**
     * Fetches the items from the backend API when the component mounts.
     * Handles errors if the fetch operation fails.
     *
     * @async
     * @function
     * @returns {void}
     */
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5555/api/items');  // API endpoint to fetch inventory data
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data); // Update inventory state with fetched data
            } catch (err) {
                setError(err.message); // Set error message if fetch fails
                console.error('Error fetching items:', err);
            }
        };

        fetchItems();
    }, []); // Empty dependency array means this will run only once, when the component mounts


    const handleAddInventorySubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:5555/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Send new inventory item data as JSON in the request body
            });
            if (!response.ok) {
                throw new Error('Error adding inventory item');
            }
            const newItem = await response.json();
            setItems((prevInventory) => [...prevInventory, newItem]); // Add the new item to the inventory state
        } catch (err) {
            console.error('Error adding inventory item:', err);
        }
    };

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/manager')}>Return to ManagerView</button>
            <button onClick={() => setShowAddItemsModal(true)}>Add Item</button>
            {error && <div>Error fetching items: {error}</div>}  {/* Show error message if fetch fails */}

            {/* Add a div wrapper for the table with scrollable styles */}
            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Seasonal</th>
                        <th>Calories</th>
                        <th>Catagory</th>
                        <th>Available</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.MenuItemId}>
                            <td>{item.MenuItemId}</td>
                            <td>{item.Name}</td>
                            <td>{item.Price}</td>
                            <td>{item.Seasonal ? 'Yes' : 'No'}</td>
                            {/* Proper boolean display */}
                            <td>{item.Calories}</td>
                            <td>{item.Category}</td>
                            {/* Fix typo here */}
                            <td>{item.Available ? 'Yes' : 'No'}</td>
                            {/* Proper boolean display */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showAddItemsModal && (
                <AddItems
                    onClose={() => setShowAddItemsModal(false)}  // Close the modal
                    onSubmit={handleAddInventorySubmit}  // Handle form submission for adding new inventory item
                />
            )}
        </div>
    );
};

export default ManageInventory;
