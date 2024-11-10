import React, { useState } from 'react';

const AddInventory = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        quantity: '',
        price: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        await onSubmit(formData);
        onClose();  // Close modal after submit
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Inventory Item</h2>
                <form>
                    <input
                        type="text"
                        name="itemName"
                        placeholder="Item Name"
                        value={formData.itemName}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <button type="button" onClick={handleSubmit}>Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddInventory;
