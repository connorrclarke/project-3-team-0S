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
import { useSideSelection } from "../../contexts/SideSelectionContext";
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import { useReceipt } from "../../contexts/ReceiptContext";

const Plate = ({ dishType = 'Plate' }) => {
  const navigate = useNavigate(); // Hook for navigating between pages
  const { selectedSide, resetSideSelection} = useSideSelection();
  const { selectedEntree1, selectedEntree2, resetEntreeSelection } = useEntreeSelection();
  const { addItem } = useReceipt(); // Access addItem from context

  /**
   * Handles the "Cancel" button click by navigating back to the CustomerView page
   * without saving the current selection.
   */
  const handleCancel = () => {
    resetSideSelection(); // Reset the side button to "Sides"
    resetEntreeSelection(); // Reset the entree button to "Entree"
    navigate('/customer'); // Redirecting back to the CustomerView page
  };

  /**
   * Handles the "Add" button click by navigating back to the CustomerView page.
   */
  const handleAdd = () => {
    if (!selectedSide || selectedSide === "Sides") {
        alert("Please select a side.");
    }
    else if (selectedEntree1 === "Entree" || selectedEntree2 === "Entree") {
      alert("Please select both entrees.");
    }
    else {
        const item = {
            // name: `Bowl - ${selectedSide} & ${selectedEntree}`,
            name:`${dishType}`,
            price: 9.80,
            sides: selectedSide,
            // entrees: selectedEntree,
            entrees: `${selectedEntree1} & ${selectedEntree2}`,
        };
        addItem(item);  // Call addItem to add the item to the receipt

        // Reset selections after adding to avoid duplicate bowl add
        resetSideSelection();
        resetEntreeSelection();
        navigate('/customer'); // Redirect to CustomerView
    }
  };

  // Navigates to sides page
  const goToSide = () => {
    navigate('/sides');
  };

  // Navigates to entree page
  const goToEntree = () => {
    navigate('/entree', { state: { dishType }});
  };


  return (
    <div className="plate-layout">
      {/* Title bar */}
      <div className="title-bar">
        <h1>{dishType}</h1>
      </div>

      {/* Middle section with circle buttons */}
      <div className="middle-section">
        <div className="category-description">
          <p>Choose your side:</p>
          <button onClick={goToSide} className="sides-circle">{selectedSide}</button>
        </div>
        <div className="category-description">
          <p>Choose your 1st entree:</p>
          <button onClick={goToEntree} className="entree-circle">{selectedEntree1}</button>
        </div>
        <div className="category-description">
          <p>Choose your 2nd entree:</p>
          <button onClick={goToEntree} className="entree-circle">{selectedEntree2}</button>
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

