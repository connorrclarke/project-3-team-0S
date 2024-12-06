import React, { createContext, useContext, useState, useEffect } from 'react';

const ZoomContext = createContext();

export const ZoomProvider = ({ children }) => {
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        const savedZoom = localStorage.getItem('zoomLevel');
        if (savedZoom) {
            setZoomLevel(parseFloat(savedZoom));
            document.documentElement.style.setProperty('--zoom-scale', savedZoom);
        }
    }, []);

    const updateZoomLevel = (newZoomLevel) => {
        setZoomLevel(newZoomLevel);
        localStorage.setItem('zoomLevel', newZoomLevel);
        document.documentElement.style.setProperty('--zoom-scale', newZoomLevel);
    };

    return (
        <ZoomContext.Provider value={{ zoomLevel, updateZoomLevel }}>
            {children}
        </ZoomContext.Provider>
    );
};

export const useZoom = () => useContext(ZoomContext);