/**
 * Plate Component
 *
 * This component represents the page where customers can customize their "Plate" order.
 * It allows users to select sides, entrees, and drinks for their plate and provides 
 * options to either add the selection to their order or cancel and return to the main view.
 *
 * @author Siddhi Mittal
 */
import React from 'react';
import './CustomerView.css';
import { useNavigate } from 'react-router-dom';

const Plate = () => {
  const navigate = useNavigate(); // Hook for navigating between pages

  /**
   * Handles the "Cancel" button click by navigating back to the CustomerView page
   * without saving the current selection.
   */
  const handleCancel = () => {
    navigate('/customer'); // Redirecting back to the CustomerView page
  };

  /**
   * Handles the "Add" button click by navigating back to the CustomerView page.
   * (Future functionality could include saving the current selection before navigating.)
   */
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
