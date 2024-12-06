import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CashierView from './views/CashierView/CashierView';

import ManagerView from './views/ManagerView/ManagerView';
import ManageEmployees from './views/ManagerView/ManageEmployees';
import ManageInventory from "./views/ManagerView/ManageInventory";
import ManageItems from "./views/ManagerView/ManageItems";
import Reports from "./views/ManagerView/MonthlyStatistics";

import CustomerView from './views/CustomerView/CustomerView';
import Bowl from './views/CustomerView/Bowl';
import Plate from './views/CustomerView/Plate';
import Checkout from './views/CustomerView/Checkout';
import Drink from "./views/CustomerView/Drink";
import Appetizer from "./views/CustomerView/Appetizer";
import BiggerPlate from "./views/CustomerView/Biggerplate";
import Entree from "./views/CustomerView/Entree";
import Side from "./views/CustomerView/Side";
import Alacarte from "./views/CustomerView/Alacarte";

function App() {
  return (
    <Router>
      <Routes>
        {/* Cashier Routes */}
        <Route path="/" element={<CashierView />} />
        
        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerView />} />
        <Route path="/employees" element={<ManageEmployees />} />
        <Route path="/inventory" element={<ManageInventory />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/reports" element={<Reports />} />

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerView />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bowl" element={<Bowl />} />
        <Route path="/plate" element={<Plate />} />
        <Route path="/drinks" element={<Drink />} />
        <Route path="/appetizers" element={<Appetizer />} />
        <Route path="/bigger-plate" element={<BiggerPlate />} />
        <Route path="/entree" element={<Entree />} />
        <Route path="/sides" element={<Side />} />
        <Route path="/alacarte" element={<Alacarte />} />
      </Routes>
    </Router>
  );
}

export default App;