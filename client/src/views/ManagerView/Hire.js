// Hire.js
import React, { useState } from 'react';
import '../../App.css';

const Hire = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        role: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        console.log("Employee ID:", formData.employeeId);
        console.log("First Name:", formData.firstName);
        console.log("Last Name:", formData.lastName);
        console.log("Role:", formData.role);
        console.log("Phone Number:", formData.phoneNumber);

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

        onSubmit(formData);
        onClose();
    };


    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Hire Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="employeeId"
                        placeholder="Employee ID"
                        value={formData.employeeId}
                        onChange={handleChange}
                    />
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

                    {/* Apply the submit and cancel button styles here */}
                    <button className="submit-button" onClick={()=> handleSubmit(formData)}>Submit</button>
                    <button  className="cancel-button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Hire;
