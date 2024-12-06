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
import { useZoom, ZoomProvider } from "./ZoomContext";

const Plate = () => {
  const navigate = useNavigate(); // Hook for navigating between pages
  const { zoomLevel, updateZoomLevel } = useZoom();

  const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
  const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
  const handleResetZoom = () => updateZoomLevel(1);

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

  // Navigates to sides page
  const goToSide = () => {
    navigate('/sides');
  };

  // Navigates to entree page
  const goToEntree = () => {
    navigate('/entree');
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
          <p>Choose your side:</p>
          <button onClick={goToSide} className="sides-circle">Sides</button>
        </div>
        <div className="category-description">
          <p>Choose your 1st entree:</p>
          <button onClick={goToEntree} className="entree-circle">Entree</button>
        </div>
        <div className="category-description">
          <p>Choose your 2nd entree:</p>
          <button onClick={goToEntree} className="entree-circle">Entree</button>
        </div>
      </div>

      {/* Bottom bar with cancel and add buttons */}
      <div className="bottom-bar">
        <button onClick={handleCancel} className="cancel-button">Cancel</button>
        <button onClick={handleZoomIn}>Zoom In</button>
        <button onClick={handleZoomOut}>Zoom Out</button>
        <button onClick={handleResetZoom}>Reset Zoom</button>
        <button onClick={handleAdd} className="add-button">Add</button>
      </div>
    </div>
  );
};

const WrappedPlate = () => (
    <ZoomProvider>
      <Plate />
    </ZoomProvider>
);

export default WrappedPlate;
