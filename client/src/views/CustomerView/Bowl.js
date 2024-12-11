/**
 * Bowl Component
 *
 * This component represents the page where customers can customize their "Bowl" order.
 * It allows users to select sides and entrees for their bowl and provides options
 * to either add the selection to their order or cancel and return to the main view.
 *
 * @author Siddhi Mittal and Meenalika Singh
 */

import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSideSelection } from "../../contexts/SideSelectionContext";
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import { useReceipt } from "../../contexts/ReceiptContext";
import { useZoom, ZoomProvider } from "./ZoomContext";
import './CustomerView.css';

const Bowl = ({ dishType = 'Bowl' }) => {
    const navigate = useNavigate(); // Hook for navigating between pages
    const { selectedSide, resetSideSelection} = useSideSelection();  // Using context for sides reset and selection
    const { selectedEntree1, resetEntreeSelection } = useEntreeSelection(); // Using context for entrees reset and selection
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
     * Handles the "Add" button click by navigating back to the CustomerView page.
     */
    const handleAdd = () => {
        if (!selectedSide || selectedSide === "Sides") {
            alert("Please select a side.");
        } 
        else if (!selectedEntree1 || selectedEntree1 === "Entree") {
            alert("Please select an entree.");
        } else {
            const item = {
                name:`${dishType}`,
                price: 8.30,
                sides: selectedSide,
                entrees: selectedEntree1,
            };
            addItem(item);  // Call addItem to add the item to the receipt

            // Reset selections after adding to avoid duplicate bowl add
            resetSideSelection();
            resetEntreeSelection();
            navigate('/customer'); // Redirect to CustomerView
        }
    };

    // Navigates to the sides page
    const goToSide = () => {
        navigate("/sides");
    };

    // Navigates to entree page
    const goToEntree1 = () => {
        navigate('/entree1');
    };

    return (
        <div className="bowl-layout">
            {/* Title bar */}
            <div className="title-bar">
                <h1>{dishType}</h1>
            </div>

            {/* Middle section with two circle buttons */}
            <div className="middle-section">
                <div className="category-description">
                    <p>Choose your side:</p>
                    <button onClick={goToSide} className="sides-circle">{selectedSide}</button>
                </div>
                <div className="category-description">
                    <p>Choose your entree:</p>
                    <button onClick={goToEntree1} className="entree-circle">{selectedEntree1}</button>
                </div>
            </div>

            {/* Bottom bar with "Cancel" and "Add" buttons */}
            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
                <button onClick={handleAdd} className="add-button" >Add</button>
            </div>
        </div>
    );
};

// Wraps the Bowl component with the ZoomProvider for zoom context
const WrappedBowl = () => (
    <ZoomProvider>
      <Bowl />
    </ZoomProvider>
);

export default WrappedBowl;
