import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CashierView from './views/CashierView/CashierView';
import ManagerView from './views/ManagerView/ManagerView'
import CustomerView from './views/CustomerView/CustomerView';
import Bowl from './views/CustomerView/Bowl';
import Plate from './views/CustomerView/Plate';
import Checkout from './views/CustomerView/Checkout';

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
      </Routes>
    </Router>
  );
}

export default App;
