/**
 * ZoomContext Component
 *
 * This component provides functionality to manage the zoom level of the application. 
 * It allows components to access and update the zoom level, while also saving and 
 * applying the zoom level from previous sessions using localStorage.
 *
 * @author Meenalika Singh
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context to manage the zoom level
const ZoomContext = createContext();

/**
 * ZoomProvider Component
 *
 * This provider component manages the zoom level state and persists it across sessions 
 * by saving the zoom level in the localStorage. It provides a function to update the zoom 
 * level, which also updates the CSS variable for zoom scale.
 *
 * @param {ReactNode} children - The child components that will consume the zoom context.
 */
export const ZoomProvider = ({ children }) => {
    // State to store the current zoom level, initialized to 1 (default zoom)
    const [zoomLevel, setZoomLevel] = useState(1);

    // useEffect hook to check for a saved zoom level in localStorage on component mount
    useEffect(() => {
        const savedZoom = localStorage.getItem('zoomLevel');
        if (savedZoom) {
            setZoomLevel(parseFloat(savedZoom)); // Set the saved zoom level if available
            document.documentElement.style.setProperty('--zoom-scale', savedZoom); // Apply the zoom scale to the document
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    /**
     * updateZoomLevel Function
     *
     * Updates the zoom level state, saves the new zoom level to localStorage, 
     * and updates the CSS variable for zoom scale to reflect the change across the application.
     *
     * @param {number} newZoomLevel - The new zoom level to set.
     */
    const updateZoomLevel = (newZoomLevel) => {
        setZoomLevel(newZoomLevel); // Update the zoom level in state
        localStorage.setItem('zoomLevel', newZoomLevel); // Save the zoom level to localStorage
        document.documentElement.style.setProperty('--zoom-scale', newZoomLevel); // Update the CSS zoom scale variable
    };

    return (
        // The provider makes the zoom level and update function available to child components
        <ZoomContext.Provider value={{ zoomLevel, updateZoomLevel }}>
            {children}
        </ZoomContext.Provider>
    );
};

/**
 * useZoom Hook
 *
 * This custom hook provides an easy way for components to access the zoom context. 
 * It returns the current zoom level and the function to update it.
 *
 * @returns {Object} The context value containing the current zoom level and the function to update it.
 */
export const useZoom = () => useContext(ZoomContext);
