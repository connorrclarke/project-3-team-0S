import React, { useState } from 'react';
import './Manager.css';

const Hire = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        phoneNumber: '',
        employed: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onSubmit(formData); // Call the parent-provided function with formData
        onClose(); // Close the modal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Hire Employee</h2>
                <form>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={formData.role}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="employed"
                            checked={formData.employed}
                            onChange={handleChange}
                        />
                        Employed
                    </label>
                    <button
                        type="button"
                        className="submit-button"
                        onClick={handleSubmit} // Use the custom handler
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hire;
