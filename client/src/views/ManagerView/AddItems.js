import React, { useState } from 'react';
import './Manager.css';

/**
 * A modal component for adding new menu items to the inventory, including a manual ID input.
 *
 * @component
 * @example
 * // Usage Example:
 * <AddItems onClose={handleClose} onSubmit={handleSubmit} />
 * @param {Function} onClose - Function to close the modal.
 * @param {Function} onSubmit - Function to handle form submission.
 * @returns {JSX.Element} The rendered AddItems component.
 */
const AddItems = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        Name: '',
        Price: '',
        Seasonal: false,
        Calories: '',
        Category: '',
        Available: false,
    });

    /**
     * Handles form input changes and updates the state.
     *
     * @param {Object} event - The input change event.
     */
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    /**
     * Handles form submission and triggers the parent onSubmit function.
     *
     * @param {Object} event - The form submission event.
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData); // Pass the form data to the parent component
        onClose(); // Close the modal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Menu Item</h2>
                <form onSubmit={handleSubmit}>

                    <label>
                        Item Name:
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="Price"
                            value={formData.Price}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </label>
                    <label>
                        Seasonal:
                        <input
                            type="checkbox"
                            name="Seasonal"
                            checked={formData.Seasonal}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Calories:
                        <input
                            type="number"
                            name="Calories"
                            value={formData.Calories}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="Category"
                            value={formData.Category}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Available:
                        <input
                            type="checkbox"
                            name="Available"
                            checked={formData.Available}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Add Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
