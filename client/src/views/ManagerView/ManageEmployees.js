import React, { useEffect, useState } from 'react';
import './Manager.css';
import { useNavigate } from "react-router-dom";
import Hire from './Hire';

// Define the API base URL
const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = "http://localhost:5555/api";

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [showHireModal, setShowHireModal] = useState(false);
    const navigate = useNavigate();
    const fetchEmployees = async () => {
        try {
            const response = await fetch(`${API_URL}/employees`);  // Use API_URL here
            //const response = await fetch('http://localhost:5555/api/employees');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching employees:', err);
        }
    };
    useEffect(() => {

        fetchEmployees();
    }, []);

    const handleHireSubmit = async (formData) => {
        try {
            const response = await fetch(`${API_URL}/hire`, {
            //const response = await fetch('http://localhost:5555/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error adding employee');
            }
            const newEmployee = await response.json();
            setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
            await fetchEmployees();
        } catch (err) {
            console.error('Error adding employee:', err);
        }

    };

    const handleFireEmeployee = async (employeeId)=>
        {
            try {
            const response = await fetch(`${API_URL}/fire/${employeeId}`);
            //const response = await fetch(`http://localhost:5555/api/fire/${employeeId}`);
            const data = await response.json();
            setEmployees(data);
            if (!response.ok) {
                throw new Error('Error firing employee');
            }
            else    {
                await fetchEmployees();

            }
        } catch (err) {
            console.error('Error adding employee:', err);
        }
    };

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/manager')}>Return to ManagerView</button>
            <button onClick={() => setShowHireModal(true)}>Hire</button>
            {error && <div>Error fetching employees: {error}</div>}
             
            <div className= "table-wrapper" >
            <table>
                <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>Phone Number</th>
                    <th>Employed</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.EmployeeId}>
                        <td>{employee.EmployeeId}</td>
                        <td>{employee.FirstName}</td>
                        <td>{employee.LastName}</td>
                        <td>{employee.Role}</td>
                        <td>{employee.PhoneNumber}</td>
                        <td>{employee.Employed ? 'Yes' : 'No'}</td>
                        <td>
                            {employee.Employed && (
                                <button className="manageEmployeeRed" onClick={() => handleFireEmeployee(employee.EmployeeId)}>Fire</button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {showHireModal && (
                <Hire
                    onClose={() => setShowHireModal(false)}
                    onSubmit={handleHireSubmit}
                />
            )}
        </div>
    );
};

export default ManageEmployees;
