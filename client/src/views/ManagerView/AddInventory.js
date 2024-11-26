import React, { useState } from 'react';
import './Manager.css';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Modal component for adding a new inventory item.
 *
 * @component
 * @example
 * const handleAddInventorySubmit = (formData) => {
 *   // Handle form submission to API or state
 * };
 *
 * return <AddInventory onClose={handleClose} onSubmit={handleAddInventorySubmit} />;
 *
 * @param {Object} props - The props for the AddInventory component.
 * @param {Function} props.onClose - A function to close the modal after submission or cancellation.
 * @param {Function} props.onSubmit - A function to handle the form submission with the form data.
 *
 * @returns {JSX.Element} A modal form for adding inventory.
 */
const AddInventory = ({ onClose, onSubmit }) => {
    const [ingredient, setIngredient] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantityUnit, setQuantityUnit] = useState('');
    const [error, setError] = useState(null);

    /**
     * Handles the form submission by creating the form data object and calling the onSubmit prop function.
     * It also handles resetting the form and closing the modal upon successful submission.
     *
     * @param {Object} e - The event object.
     *
     * @returns {void}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { Ingredient: ingredient, Quantity: quantity, QuantityUnit: quantityUnit };

        try {
            const response = await fetch(`${API_URL}/inventory`, {  // Use API_URL here
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error adding inventory item');
            }
            const newItem = await response.json();
            onSubmit(newItem); // Notify parent component of new item
            setIngredient('');
            setQuantity('');
            setQuantityUnit('');
            onClose();
        } catch (err) {
            setError('Error adding inventory item');
            console.error('Error:', err);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Inventory Item</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ingredient">Item Name:</label>
                        <input type="text" id="ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="quantityUnit">Quantity Unit:</label>
                        <input type="text" id="quantityUnit" value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)} required />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="modal-buttons">
                        <button type="submit">Add Item</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInventory;
