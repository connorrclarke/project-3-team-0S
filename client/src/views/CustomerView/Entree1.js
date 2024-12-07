import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const Entree1Selection = () => {
    const navigate = useNavigate();
    const [entrees, setEntrees] = useState([]);
    const { selectedEntree1, setSelectedEntree1 } = useEntreeSelection(); // Access selected entree1

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchEntrees = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/entrees`);
                if (!response.ok) throw new Error("Failed to fetch entrees.");

                const data = await response.json();
                setEntrees(data.filter((item) => item.available).map((item) => item.Name));
            } catch (error) {
                console.error("Error fetching entrees:", error);
            }
        };

        fetchEntrees();
    }, [API_URL]);

    const handleAdd = () => {
        if (selectedEntree1) {
            navigate(-1);
        } else {
            alert("Please select your first entree.");
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="plate-layout">
            <div className="title-bar">
                <h2>Select Your 1st Entree</h2>
            </div>
            <div className="button-container">
                {entrees.map((entree) => (
                    <button
                        key={entree}
                        className={`entree-circle ${selectedEntree1 === entree ? "selected" : ""}`}
                        onClick={() => setSelectedEntree1(entree)} // Set the entree1
                    >
                        {entree}
                    </button>
                ))}
            </div>

            <div className="bottom-bar">
                <button className="cancel-button" onClick={handleCancel}>
                    Cancel
                </button>
                <button className="add-button" onClick={handleAdd}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default Entree1Selection;

