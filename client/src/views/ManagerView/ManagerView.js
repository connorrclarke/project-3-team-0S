/**
 * ManagerView Component
 *
 * This component is responsible for rendering the main view for a manager. It provides
 * buttons for navigating to various sections like managing employees, managing inventory,
 * managing items, and viewing monthly statistics.
 *
 * @author Luke Lopez
 */
import React from 'react';
import '../ManagerView/Manager.css';
import { useNavigate } from "react-router-dom";

const ManagerView = ({ setView }) => {

    const navigate = useNavigate();

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/')}>Return to CashierView</button>
            <button onClick={() => navigate('/employees')}>Manage Employees</button>
            <button onClick={() => navigate('/inventory')}>Manage Inventory</button>
            <button>Manage Items</button>
            <button>Monthly Statistics</button>
        </div>
    );
};

export default ManagerView;
