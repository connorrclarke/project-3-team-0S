import React, { useState } from 'react';
import './Manager.css';

/**
 * A modal component for adding new menu items to the inventory.
 *
 * @component
 * @example
 * // Usage Example:
 * <AddItems onClose={handleClose} onSubmit={handleSubmit} />
 * @author Luke Lopez
 * @param {Function} onClose - Function to close the modal.
 * @returns {JSX.Element} The rendered AddItems component.
 */
const AddItems = ({ onClose }) => {
    const [formData, setFormData] = useState({
        Name: '',
        Price: '',
        Seasonal: false,
        Calories: '',
        Category: '',
        Available: false,
    });

    const [error, setError] = useState(null); // To track errors during the submission

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
     * Sends a POST request to add a new item to the backend.
     *
     * @returns {Promise<void>}
     */
    const sendRequest = async () => {
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            // Check if the response has a valid JSON body
            const responseText = await response.text();
            const data = responseText ? JSON.parse(responseText) : null;

            console.log('Item added successfully:', data);
        } catch (error) {
            console.error('Error adding item:', error);
            setError(error.message);
        }
    };


    /**
     * Handles form submission, sends the request, and closes the modal.
     *
     * @param {Object} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Clear previous errors

        await sendRequest();
        onClose(); // Close the modal after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Menu Item</h2>
                {error && <div className="error-message">{error}</div>}
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
