import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Manager.css';

//const API_URL = process.env.REACT_APP_API_URL ;
//const API_URL =  'http://localhost:5555/api';

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
     * Handles the form submission.
     *
     * @param {Object} e - The event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            itemName: ingredient,
            quantity: parseInt(quantity, 10),
            description: quantityUnit,
        };

        try {



            onSubmit(formData); // Notify parent component
            resetForm();
            onClose();
        } catch (err) {
            setError('Failed to add the inventory item. Please try again.');
            console.error('Error:', err);
        }
    };

    /**
     * Resets the form inputs and error state.
     */
    const resetForm = () => {
        setIngredient('');
        setQuantity('');
        setQuantityUnit('');
        setError(null);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Inventory Item</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="ingredient">Item Name:</label>
                        <input
                            type="text"
                            id="ingredient"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            min="1"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantityUnit">Quantity Unit:</label>
                        <input
                            type="text"
                            id="quantityUnit"
                            value={quantityUnit}
                            onChange={(e) => setQuantityUnit(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="modal-buttons">
                        <button type="submit" className="submit-button">Add Item</button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddInventory.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AddInventory;
