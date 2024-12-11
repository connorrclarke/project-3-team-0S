/**
 * Biggerplate Component
 *
 * This component represents the page where customers can customize their "Bigger Plate" order.
 * It allows users to select sides and three entrees for their meal. The page includes options 
 * to either add the customized meal to their order or cancel and return to the main view.
 *
 * @author Siddhi Mittal and Meenalika Singh
 */

import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';
import { useSideSelection } from "../../contexts/SideSelectionContext";
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import { useReceipt } from "../../contexts/ReceiptContext";
import { useZoom, ZoomProvider } from "./ZoomContext";

function Biggerplate({ dishType = 'Bigger Plate' }) {
    const navigate = useNavigate(); // Hook for navigating between pages
    const { selectedSide, resetSideSelection} = useSideSelection(); // Context for managing side selection
    const { selectedEntree1, selectedEntree2, selectedEntree3, resetEntreeSelection } = useEntreeSelection(); // Context for managing entree selection
    const { addItem } = useReceipt(); // Access addItem from context

    const { zoomLevel, updateZoomLevel } = useZoom(); // Access zoom level and update functions from context
    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2)); // Handles zoom in functionality with a maximum zoom level of 2
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5)); // Handles zoom out functionality with a minimum zoom level of 0.5
    const handleResetZoom = () => updateZoomLevel(1); // Resets zoom to the default level (1)

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
     * Handles the "Add" button click. Validates user input to ensure all fields
     * are filled out, then adds the customized "Bigger Plate" to the receipt.
     */
    const handleAdd = () => {
        if (!selectedSide || selectedSide === "Sides") {
            alert("Please select a side."); 
        } 
        else if (selectedEntree1 === "Entree" || selectedEntree2 === "Entree" || selectedEntree3 === "Entree") {
            alert("Please select all entrees."); 
        }
        else {
            const item = {
                name:`${dishType}`,
                price: 11.30,
                sides: selectedSide,
                entrees: `${selectedEntree1} & ${selectedEntree2} &  ${selectedEntree3}`,
            };
            addItem(item); // Call addItem to add the item to the receipt

            // Reset selections after adding to avoid duplicate bowl add
            resetSideSelection();
            resetEntreeSelection();
            navigate('/customer');
        }
    };

    // Navigates to sides page
    const goToSide = () => {
        navigate('/sides');
    };

   // Navigates to the first entree page
    const goToEntree1 = () => {
        navigate('/entree1');
    };

    // Navigates to the second entree page
    const goToEntree2 = () => {
        navigate('/entree2');
    };

    // Navigates to the third entree page
    const goToEntree3 = () => {
        navigate('/entree3');
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h1>{dishType}</h1>
            </div>

            <div className="middle-section">
                <div className="category-description">
                    <p>Choose your side:</p>
                    <button onClick={goToSide} className="sides-circle">{selectedSide}</button>
                </div>

                <div className="category-description">
                    <p>Choose your 1st entree:</p>
                    <button onClick={goToEntree1} className="entree-circle">{selectedEntree1}</button>
                </div>

                <div className="category-description">
                    <p>Choose your 2nd entree:</p>
                    <button onClick={goToEntree2} className="entree-circle">{selectedEntree2}</button>
                </div>


                <div classNae="category-description">
                    <p>Choose your 3rd entree:</p>
                    <button onClick={goToEntree3} className="entree-circle">{selectedEntree3}</button>
                </div>
            </div>

            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
                <button onClick={handleAdd} className="add-button">Add</button>
            </div>
        </div>
    );
}

// Wraps the Biggerplate component with the ZoomProvider for zoom context
const WrappedBiggerplate = () => (
    <ZoomProvider>
        <Biggerplate />
    </ZoomProvider>
);

export default WrappedBiggerplate;
