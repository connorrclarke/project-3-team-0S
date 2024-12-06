import React, {} from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';
import { useSideSelection } from "../../contexts/SideSelectionContext";
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import { useReceipt } from "../../contexts/ReceiptContext";

function Biggerplate({ dishType = 'Bigger Plate' }) {
    const navigate = useNavigate(); // Hook for navigating between pages
    const { selectedSide, resetSideSelection} = useSideSelection();
    const { selectedEntree1, selectedEntree2, selectedEntree3, resetEntreeSelection } = useEntreeSelection();
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
        else if (selectedEntree1 === "Entree" || selectedEntree2 === "Entree" || selectedEntree3 === "Entree") {
            alert("Please select all entrees.");
        }
        else {
            const item = {
                // name: `Bowl - ${selectedSide} & ${selectedEntree}`,
                name:`${dishType}`,
                price: 11.30,
                sides: selectedSide,
                // entrees: selectedEntree,
                entrees: `${selectedEntree1} & ${selectedEntree2} &  ${selectedEntree3}`,
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
                    <button onClick={goToEntree} className="entree-circle">{selectedEntree1}</button>
                </div>

                <div className="category-description">
                    <p>Choose your 2nd entree:</p>
                    <button onClick={goToEntree} className="entree-circle">{selectedEntree2}</button>
                </div>

                <div classNae="category-description">
                    <p>Choose your 3rd entree:</p>
                    <button onClick={goToEntree} className="entree-circle">{selectedEntree3}</button>
                </div>
            </div>

            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleAdd} className="add-button">Add</button>
            </div>
        </div>
    );
}

export default Biggerplate;