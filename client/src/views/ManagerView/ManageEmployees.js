import React, { useEffect, useState } from 'react';
import '../../App.css';
import {useNavigate} from "react-router-dom";

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const HandleFire = async (employeeId) => {
        console.log("Firing Employee ID: " + employeeId);
        try {
            const response = await fetch(`http://localhost:5000/api/fire/${employeeId}`, { method: 'GET' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data.message); // Logs "Employee fired successfully"
            // Optional: Refresh the employee list or remove the fired employee from the local state
        } catch (err) {
            console.error('Error firing employee:', err);
        }
    };


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/employees'); // Make sure this points to the correct port
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

        fetchEmployees();
    }, []);

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/manager')}>Return to CashierView</button>
            {error && <div>Error fetching employees: {error}</div>}


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
                {employees.map(employee => (
                    <tr key={employee.EmployeeId}>
                        <td> {employee.EmployeeId} </td>
                        <td>{employee.FirstName}</td>
                        <td>{employee.LastName}</td>
                        <td>{employee.Role}</td>
                        <td>{employee.PhoneNumber}</td>
                        <td>{employee.Employed ? 'Yes' : 'No'}</td>
                        <td>
                            <button onClick={() => HandleFire(employee.EmployeeId)} className={"manageEmployeeRed"}> Fire</button>
                        </td>

                    </tr>
                ))}

                </tbody>
            </table>
            <table>
                <thead>Manage Employees</thead>
                <tbody>
                <tr>
                    <td><button className={"manageEmployeeGreen"}> Hire </button></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ManageEmployees;
