// src/components/ManagerPage.js
import React, { useState } from 'react';

const ManagerPage = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  const renderContent = () => {
    switch (activeTab) {
      case 'inventory':
        return <div>Inventory Management</div>;
      case 'employees':
        return <div>Employee Management</div>;
      case 'menu':
        return <div>Menu Management</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="manager-page">
      <h1>Manager Interface</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('inventory')}>Inventory</button>
        <button onClick={() => setActiveTab('employees')}>Employees</button>
        <button onClick={() => setActiveTab('menu')}>Menu</button>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManagerPage;
