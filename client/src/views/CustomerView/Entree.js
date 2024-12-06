import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import "./CustomerView.css";
import { useZoom, ZoomProvider } from "./ZoomContext";


const importAll = (requireContext) => {
    const images = {};
    requireContext.keys().forEach((key) => {
        const fileName = key.replace("./", "").replace(/\.(png|jpe?g|gif)$/i, "");
        images[fileName] = requireContext(key);
    });
    return images;
};

const images = importAll(require.context("./Pictures", false, /\.(png|jpe?g|gif)$/));

const EntreeSelection = ({ dishType }) => {
    const navigate = useNavigate();
    const [entrees, setEntrees] = useState([]);
    const { selectedEntree1, selectedEntree2, selectedEntree3, setSelectedEntree1, setSelectedEntree2, setSelectedEntree3 } = useEntreeSelection();
    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchEntrees = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/entrees`);
                if (!response.ok) throw new Error('Failed to fetch entrees.');

                const data = await response.json();
                setEntrees(data.filter((item) => item.available).map((item) => item.Name));
            } catch (error) {
                console.error('Error fetching entrees:', error);
            }
        };

        fetchEntrees();
    }, [API_URL]);

    // Update selectEntree to handle all three entrees
    const selectEntree = (entree, index) => {
        if (index === 8) {
            setSelectedEntree1(entree);
        }
        else if (index === 2) {
            setSelectedEntree1(entree);
        }
        else if (index === 3) {
            setSelectedEntree2(entree);
        } 
        else if (index === 3) {
            setSelectedEntree3(entree);
        }
    };

    const handleAdd = () => {
        // Adjust validation based on the dishType (Bowl, Plate, Bigger Plate)
        if (dishType === "Bowl" && !selectedEntree1) {
            alert("Please select one entree.");
        } else if (dishType === "Plate" && (!selectedEntree1 || !selectedEntree2)) {
            alert("Please select two entrees.");
        } else if (dishType === "Bigger Plate" && (!selectedEntree1 || !selectedEntree2 || !selectedEntree3)) {
            alert("Please select three entrees.");
        } else {
            navigate(-1); 
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Select Your Entrees</h2>
            </div>
            <div className="button-container">
                {entrees.map((entree, index) => (
                    <div key={index}>
                        <button
                            className={`entree-circle ${[selectedEntree1, selectedEntree2, selectedEntree3].includes(entree) ? "selected" : ""}`}
                            onClick={() => selectEntree(entree, index + 1)} // Passing the index (1, 2, or 3)
                        >
                            {entree}
                        </button>
                    </div>
                ))}
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
};

const WrappedEntreeSelection = () => (
    <ZoomProvider>
        <EntreeSelection />
    </ZoomProvider>
);

export default WrappedEntreeSelection;
