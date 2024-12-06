import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSideSelection } from "../../contexts/SideSelectionContext";
import "./CustomerView.css";
import {useZoom, ZoomProvider} from "./ZoomContext";

const SelectSides = () => {
    const [sides, setSides] = useState([]);
    const [localSelectedSide, setLocalSelectedSide] = useState(null);
    const { setSelectedSide } = useSideSelection();
    const navigate = useNavigate();
    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);


    const API_URL = process.env.REACT_APP_API_URL;
    //const API_URL = "http://localhost:5555/api";

    useEffect(() => {
        const fetchSides = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/sides`);
                if (!response.ok) throw new Error('Failed to fetch sides.');

                const data = await response.json();
                setSides([...sides, ...data.filter((item) => item.available).map((item) => item.Name)]);
            } catch (error) {
                console.error('Error fetching sides:', error);
            }
        };

        fetchSides();
    }, []);
    
    const handleAdd = () => {
        if (localSelectedSide) {
            setSelectedSide(localSelectedSide); // Update the shared state
            navigate(-1); // Go back to the previous page
        } else {
            alert("Please select a side!");
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Select Your Side(s)</h2>
            </div>
            <div className="middle-section">
                {sides.map((side) => (
                    <button
                        key={side}
                        className={`sides-circle ${localSelectedSide === side ? "selected" : ""}`}
                        onClick={() => setLocalSelectedSide(side)}
                    >
                        {side}
                    </button>
                ))}
            </div>


            <div className="bottom-bar">
                <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
};

const WrappedSelectSides = () => (
    <ZoomProvider>
        <SelectSides/>
    </ZoomProvider>
);

export default WrappedSelectSides;
