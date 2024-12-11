/**
 * Entree1Selection Component
 *
 * This component allows users to select their first entree from the list of available options.
 * It fetches entree data from the API, displays the options, and provides buttons to either 
 * confirm the selection or cancel and return to the previous page.
 *
 * @author Siddhi Mittal and Meenalika Singh
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import "./CustomerView.css";

/**
 * Utility function to dynamically import all images from the specified directory.
 * The function maps image filenames to their respective paths for easy referencing.
 *
 * @param {Object} requireContext - The context created by Webpack's `require.context`.
 * @returns {Object} - An object mapping filenames to image paths.
 */
const importAll = (requireContext) => {
    const images = {};
    requireContext.keys().forEach((key) => {
        const fileName = key.replace("./", "").replace(/\.(png|jpe?g|gif)$/i, "");
        images[fileName] = requireContext(key);
    });
    return images;
};

// Dynamically import all images from the "Pictures" folder
const images = importAll(require.context("./Pictures", false, /\.(png|jpe?g|gif)$/));

/**
 * Entree1Selection component handles the selection of the first entree.
 * It fetches available entrees from the API and provides navigation options.
 */
const Entree1Selection = () => {
    const navigate = useNavigate(); // Hook for navigating between pages
    const [entrees, setEntrees] = useState([]); // State to store available entrees
    const { selectedEntree1, setSelectedEntree1 } = useEntreeSelection(); // Context for managing the first entree selection

    const API_URL = process.env.REACT_APP_API_URL; // Base API URL from environment variables

    /**
     * useEffect to fetch entree data from the API on component mount.
     * Filters the data to include only available entrees.
     */
    useEffect(() => {
        const fetchEntrees = async () => {
            try {
                const response = await fetch(`${API_URL}/menu-items/entrees`);
                if (!response.ok) throw new Error("Failed to fetch entrees.");

                const data = await response.json();
                // Filter only available entrees and extract their names
                setEntrees(data.filter((item) => item.available).map((item) => item.Name));
            } catch (error) {
                console.error("Error fetching entrees:", error);
            }
        };

        fetchEntrees();
    }, [API_URL]);

    /**
     * Handles the "Add" button click.
     * Navigates back to the previous page if an entree is selected,
     * otherwise prompts the user to select an entree.
     */
    const handleAdd = () => {
        if (selectedEntree1) {
            navigate(-1);
        } else {
            alert("Please select your first entree.");
        }
    };

    /**
     * Handles the "Cancel" button click.
     * Navigates back to the previous page without saving any selection.
     */
    const handleCancel = () => {
        navigate(-1);
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
                        onClick={() => setSelectedEntree1(entree)}
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

