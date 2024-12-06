import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import "./CustomerView.css";

const importAll = (requireContext) => {
    const images = {};
    requireContext.keys().forEach((key) => {
        const fileName = key.replace("./", "").replace(/\.(png|jpe?g|gif)$/i, "");
        images[fileName] = requireContext(key);
    });
    return images;
};

const images = importAll(require.context("./Pictures", false, /\.(png|jpe?g|gif)$/));

const EntreeSelection = () => {
    const navigate = useNavigate();
    const [entrees, setEntrees] = useState([]);
    const { selectedEntree, setSelectedEntree } = useEntreeSelection();

    const API_URL = process.env.REACT_APP_API_URL;
    //const API_URL = "http://localhost:5555/api";

    useEffect(() => {
        const fetchEntrees = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/entrees`);
                if (!response.ok) throw new Error('Failed to fetch entrees.');

                const data = await response.json();
                setEntrees([...entrees, ...data.filter((item) => item.available).map((item) => item.Name)]);
            } catch (error) {
                console.error('Error fetching entrees:', error);
            }
        };

        fetchEntrees();
    }, []);

    // Select one entree and update the selection
    const selectEntree = (entree) => {
        setSelectedEntree([entree]); // Only allow one entree at a time
    };

    // Add selected entrees and navigate back
    const handleAdd = () => {
        if (selectedEntree.length === 0) {
            alert("Please select at least one entree.");
        } else {
            navigate(-1); // Go back to the Bowl page
        }
    };
    
    const handleCancel = () => {
        setSelectedEntree([]); // Clear the selection
        navigate(-1); // Go back to the previous page
    };
    

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Select an Entree</h2>
            </div>
            <div className="button-container">
                {entrees.map((entree, index) => (
                    <button
                        style={{
                            backgroundImage: `url(${images[entree]})`,
                        }}
                        key={index}
                        className={`entree-circle ${
                            selectedEntree.includes(entree) ? "selected" : ""
                        }`}
                        onClick={() => selectEntree(entree)}
                    >
                        {entree}
                    </button>


                ))}
            </div>
            <div className="bottom-bar">
                <button onClick={handleCancel} className="cancel-button">Cancel</button>
                <button onClick={handleAdd} className="add-button">Add</button>
            </div>
        </div>
    );
};

export default EntreeSelection;
