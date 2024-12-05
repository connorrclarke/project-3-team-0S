import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CashierView from './views/CashierView/CashierView';
import ManagerView from './views/ManagerView/ManagerView'
import CustomerView from './views/CustomerView/CustomerView';
import Bowl from './views/CustomerView/Bowl';
import Plate from './views/CustomerView/Plate';
import Checkout from './views/CustomerView/Checkout';
import ManageEmployees from './views/ManagerView/ManageEmployees';
import ManageInventory from "./views/ManagerView/ManageInventory";
import ManageItems from "./views/ManagerView/ManageItems";
import Reports from "./views/ManagerView/MonthlyStatistics";

import Drink from "./views/CustomerView/Drink";
import Appetizer from "./views/CustomerView/Appetizer"; //don't know why its giving error
import BiggerPlate from "./views/CustomerView/Biggerplate";
import Entree from "./views/CustomerView/Entree";
import Side from "./views/CustomerView/Side";
import Alacarte from "./views/CustomerView/Alacarte";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CashierView />} />
        <Route path="/manager" element={<ManagerView />} />
        <Route path="/customer" element={<CustomerView />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bowl" element={<Bowl />} />
        <Route path="/plate" element={<Plate />} />
        <Route path= "/employees" element = {<ManageEmployees/>} />
        <Route path= "/inventory" element = {<ManageInventory/>} />
        <Route path= "/items" element = {<ManageItems/>} />
        <Route path= "/reports" element = {<Reports/>} />
        <Route path= "/drinks" element = {<Drink/>} />
        <Route path= "/appetizers" element = {<Appetizer/>} />
        <Route path= "/bigger-plate" element = {<BiggerPlate/>} />
        <Route path= "/entree" element = {<Entree/>} />
        <Route path= "/sides" element = {<Side/>} />
        <Route path= "/alacarte" element = {<Alacarte/>} />

        {/* Add other routes here for different views */}

      </Routes>
    </Router>
  );
}

export default App;
