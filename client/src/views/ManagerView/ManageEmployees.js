// ManagerView.js
import React, { useState } from 'react';
import '../../App.css';
import {useNavigate} from "react-router-dom";


const ManageInventory = ({ setView }) => {
    const [count,setCount] = useState(0);
    const navigate = useNavigate();
    return (
        <div className="manager-view">
            <button onClick={() => navigate('/')}>Return to CashierView</button>
            <button classname = "managerButtons">Manage Employees</button>

            <button>Monthly Statistics</button>
        </div>
    );
};

export default ManageInventory;
