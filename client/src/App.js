import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CashierView from './views/CashierView/CashierView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CashierView />} />
        {/* Add other routes here for different views */}
      </Routes>
    </Router>
  );
}

export default App;
