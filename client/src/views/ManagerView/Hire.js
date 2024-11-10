import React, { useState } from 'react';
import '../../App.css';

const Hire = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        phoneNumber: '',
        employed: true, // Set employed to true by default
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        console.log("First Name:", formData.firstName);
        console.log("Last Name:", formData.lastName);
        console.log("Role:", formData.role);
        console.log("Phone Number:", formData.phoneNumber);
        console.log("Employed:", formData.employed); // Log employed status

        try {
            const response = await fetch('http://localhost:5000/api/hire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send formData in request body
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error('Error hiring employee');
            } else {
                console.log(data.message);
                window.location.reload();
            }
        } catch (err) {
            console.error('Error adding employee:', err);
        }

        onSubmit(formData); // Call onSubmit callback if provided
        onClose(); // Close the modal
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Hire Employee</h2>
                <form onSubmit={handleSubmit}>
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

                    {/* Add checkbox for 'Employed' status */}
                    <label>
                        <input
                            type="checkbox"
                            name="employed"
                            checked={formData.employed}
                            onChange={handleChange}
                        />
                        Employed
                    </label>

                    <button type="submit" className="submit-button">Submit</button>
                    <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Hire;
