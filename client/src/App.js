import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CashierView from './views/CashierView/CashierView';
import ManagerView from './views/ManagerView/ManagerView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CashierView />} />{}
          <Route path="/manager" element={<ManagerView />} />
          {/* Add other routes here for different views */}
      </Routes>
    </Router>
  );
}

export default App;
