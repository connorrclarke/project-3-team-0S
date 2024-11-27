import React, { useState } from 'react';
import './Manager.css';

const API_URL = "http://localhost:5555/api"; //process.env.REACT_APP_API_URL;

/**
 * A component for hiring a new employee, including a form to input employee details.
 *
 * @component
 * @example
 * // Usage Example:
 * <Hire onClose={handleClose} onSubmit={handleSubmit} />
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onClose - A callback function to close the modal.
 * @param {Function} props.onSubmit - A callback function to handle form submission.
 * @author Luke Lopez
 * @returns {JSX.Element} The rendered Hire component.
 */
const Hire = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        phoneNumber: '',
        employed: true,
    });

    /**
     * Handles the change of input values in the form.
     *
     * @param {Object} e - The event object for the change event.
     * @param {string} e.target.name - The name of the input field.
     * @param {string} e.target.value - The value entered in the input field.
     * @param {boolean} e.target.checked - The checked state of the checkbox.
     *
     * @returns {void}
     */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    /**
     * Handles the form submission to hire a new employee.
     * Sends the form data to the server and logs the response.
     *
     * @async
     * @function
     * @param {Object} e - The submit event object.
     * @returns {void}
     * @throws {Error} If there is an error during the submission or if the server returns an error.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/hire`, {  // Use API_URL here
            //const response = await fetch('http://localhost:5555/api/hire', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error hiring employee');
            }
            const data = await response.json();
            console.log(data.message);
            onSubmit(formData);
            onClose();
        } catch (err) {
            console.error('Error adding employee:', err);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Hire Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                    <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
                    <label>
                        <input type="checkbox" name="employed" checked={formData.employed} onChange={handleChange} />
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
