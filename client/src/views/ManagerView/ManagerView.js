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
import './Manager.css';
import { useNavigate } from "react-router-dom";

/**
 * @function ManagerView
 * @description Main view for a manager, allowing navigation to different management areas.
 * @returns {JSX.Element}
 */
const ManagerView = ({ setView }) => {

    const navigate = useNavigate();

    return (
        <div className="manager-view">
            <button onClick={() => navigate('/')}>Return to CashierView</button>
            <button onClick={() => navigate('/employees')}>Manage Employees</button>
            <button onClick={() => navigate('/inventory')}>Manage Inventory</button>
            <button onClick={() => navigate('/items')}>Manage Menu Items</button>
            <button onClick={()=> navigate('/reports')}>Monthly Statistics</button>
        </div>
    );
};

export default ManagerView;
