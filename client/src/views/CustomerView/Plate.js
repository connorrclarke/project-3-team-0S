import React from 'react';
import '../../App.css';
import './CustomerView.css';
import { useNavigate } from 'react-router-dom';

const Plate = () => {
  const navigate = useNavigate();

  // Handling the "Add" and "Cancel" button actions
  const handleCancel = () => {
    navigate('/customer'); // Redirecting back to the CustomerView page
  };

  const handleAdd = () => {
    navigate('/customer'); // Redirecting back to the CustomerView page
  };

  return (
    <div className="plate-layout">
      {/* Title bar */}
      <div className="title-bar">
        <h1>Plate</h1>
      </div>

      {/* Middle section with circle buttons */}
      <div className="middle-section">
        <div className="category-description">
          <p>Choose your sides:</p>
          <button className="sides-circle">Sides</button>
        </div>
        <div className="category-description">
          <p>Choose your entrees:</p>
          <button className="entree-circle">Entree</button>
        </div>
        <div className="category-description">
          <p>Choose your drinks:</p>
          <button className="entree-circle">Entree</button>
        </div>
      </div>

      {/* Bottom bar with cancel and add buttons */}
      <div className="bottom-bar">
        <button onClick={handleCancel} className="cancel-button">Cancel</button>
        <button onClick={handleAdd} className="add-button">Add</button>
      </div>
    </div>
  );
};

export default Plate;
