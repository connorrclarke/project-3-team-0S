// ManagerView.js
import React from 'react';
import '../../App.css';
import {useNavigate} from "react-router-dom";

const ManagerView = ({ setView }) => {

    const navigate = useNavigate();
    return (
        <div className="manager-view">
            <button onClick={() => navigate('/')}>Return to CashierView</button>
            <button onClick={ () => navigate('/employees')}>Manage Employees</button>
            <button onClick={()=>navigate('/inventory') }>Manage Inventory</button>
            <button>Manage Items</button>
            <button>Monthly Statistics</button>
        </div>
    );
};

export default ManagerView;
