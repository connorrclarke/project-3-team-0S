// ManagerView.js
import React from 'react';
import '../../App.css';
import {useNavigate} from "react-router-dom";

const ManagerView = ({ setView }) => {
    const navigate = useNavigate();
    return (
        <div className="manager-view">
            <button onClick={() => navigate('/')}>Return to CashierView</button>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
            <button>Button 4</button>
        </div>
    );
};

export default ManagerView;
