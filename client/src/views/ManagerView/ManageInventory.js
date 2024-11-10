import React, { useEffect, useState } from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import AddInventory from './AddInventory';  // A component for adding new inventory items

const ManageInventory = () => {
    const [inventory, setInventory] = useState([]);  // Change 'employees' to 'inventory'
    const [error, setError] = useState(null);
    const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/inventory');  // Adjust the API endpoint
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

        fetchInventory();
    }, []);

    const handleAddInventorySubmit = async (formData) => {
        try {
            const response = await fetch('http://localhost:5000/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error adding inventory item');
            }
            const newItem = await response.json();
            setInventory((prevInventory) => [...prevInventory, newItem]); // Update inventory list
        } catch (err) {
            console.error('Error adding inventory item:', err);
        }
    };

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/manager')}>Return to ManagerView</button>
            <button onClick={() => setShowAddInventoryModal(true)}>Add Inventory Item</button>
            {error && <div>Error fetching inventory: {error}</div>}

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
                    onClose={() => setShowAddInventoryModal(false)}
                    onSubmit={handleAddInventorySubmit}
                />
            )}
        </div>
    );
};

export default ManageInventory;
