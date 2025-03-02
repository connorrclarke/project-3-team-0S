/**
 * CustomerView Component
 *
 * This component provides the user interface for the customer-facing view of the POS system.
 * It allows customers to interact with menu categories, view their receipt, and proceed to checkout.
 * Additionally, it displays real-time weather information and includes accessibility features like
 * Google Translate integration, Zoom In/Out, and high-contrast mode.
 *
 * @author Siddhi Mittal, Connor Clarke, Luke Lopez, and Meenalika Singh
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSideSelection } from "../../contexts/SideSelectionContext";
import { useEntreeSelection } from "../../contexts/EntreeSelectionContext";
import { useReceipt } from '../../contexts/ReceiptContext';
import { useAuth0 } from '@auth0/auth0-react';
import './CustomerView.css';
import Receipt from './ReceiptKiosk';
import { useZoom, ZoomProvider } from "./ZoomContext";

// API details for fetching weather information
const api = {
    key: 'd453e1ec5fc10a70f578d8c724e586cd',
    base: 'https://api.openweathermap.org/data/2.5/'
};

const CustomerView = () => {
    const navigate = useNavigate(); // Hook for navigation
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0(); // Auth0 hooks
    const translateButtonRef = useRef(null); // Ref for Google Translate button
    const [weather, setWeather] = useState({}); // State for storing weather data
    const [highContrast, setHighContrast] = useState(false);
    const { addItem, removeItem, receipt } = useReceipt(); // Using context for receipt data
    const applyTax = true; // Flag to indicate if tax should be applied
    const { resetSideSelection} = useSideSelection(); // Using context for sides reset
    const { resetEntreeSelection } = useEntreeSelection(); // Using context for entrees reset

    const { zoomLevel, updateZoomLevel } = useZoom(); // Access zoom level and update functions from context
    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2)); // Handles zoom in functionality with a maximum zoom level of 2
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5)); // Handles zoom out functionality with a minimum zoom level of 0.5
    const handleResetZoom = () => updateZoomLevel(1); // Resets zoom to the default level (1)

    // Fetching passed state (side and entree selections)
    const location = useLocation();

    // Calculate receipt totals
    const subtotal = receipt.reduce((acc, item) => acc + item.price, 0);
    const taxRate = 0.0825;
    const taxAmount = applyTax ? subtotal * taxRate : 0;
    const total = subtotal + taxAmount;

    /**
     * Fetches weather data for College Station using the OpenWeatherMap API
     * and updates the weather state.
     */
    useEffect(() => {
        fetch(`${api.base}weather?q=College Station&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
            })
            .catch((error) => console.error('Error fetching weather data:', error));
    }, []);

    //setting high contrast toggle
    const funtionTest = () => {
        setHighContrast(!highContrast);
    };

    /**
     * Dynamically loads the Google Translate script for on-the-fly translation
     * of the page content.
     */
    const translatePage = () => {
        if (!document.querySelector('#google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);

            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    { pageLanguage: 'en' },
                    translateButtonRef.current
                );
            };
        } else {
            if (window.googleTranslateElementInit) {
                window.googleTranslateElementInit();
            }
        }
    };
    
    // Navigates to employee login page
    const handleLoginLogout = () => {
        if (isAuthenticated) {
            logout({ returnTo: window.location.origin });
        } else {
            loginWithRedirect();
        }
    };

    // Adding bowl, plate, bigger plate to receipt
    useEffect(() => {
        if (location.state?.newItem) {
            const { name, price, sides, entrees } = location.state.newItem;
    
            // Check if both sides and entrees are null or undefined
            if (sides || entrees) {
                addItem({
                    name: `${name} - ${sides ? sides : ''} & ${entrees ? entrees : ''}`, // Conditionally add sides and entrees
                    price: price,
                    sides,
                    entrees
                });
            } else {
                // Add the item without sides or entrees if both are null
                addItem({
                    name: name,
                    price: price,
                    sides: null,
                    entrees: null
                });
            }
    
            navigate('/customer', { replace: true, state: {} });  // Reset state after handling item
        }
    }, [location.state, addItem, navigate]);    

    // Inside CustomerView component
    const resetSelections = () => {
        resetSideSelection(); // Reset side selection
        resetEntreeSelection(); // Reset entree selection
    };

    // Navigates to bowl menu page
    const goToBowlPage = () => {
        resetSelections(); // Reset selections before navigating
        navigate('/bowl');
    };

    // Navigates to plate menu page
    const goToPlatePage = () => {
        resetSelections();
        navigate('/plate');
    };

    // Navigates to bigger plate menu page
    const goToBiggerPlatePage = () => {
        resetSelections();
        navigate('/bigger-plate');
    };

    // Navigates to appetizer menu page
    const goToAppetizersPage = () => {
        navigate('/appetizers');
    };

    // Navigates to drinks menu page
    const goToDrinksPage = () => {
        navigate('/drinks');
    };
    
    // Navigates to a la carte menu page
    const goToAlacartePage = () => {
        resetSelections();
        navigate('/alacarte');
    }

    // Navigates to checkout page, passing the current receipt and total
    const goToCheckout = () => {
        const subtotal = receipt.reduce((acc, item) => acc + item.price, 0);
        const taxRate = 0.0825;
        const taxAmount = subtotal * taxRate;
        const total = subtotal + taxAmount;
        
        navigate('/checkout', { state: { receipt, total } });
    };

    /**
    * Removes an item from the receipt by its index.
    *
    * @param {number} index - The index of the item to remove.
    */
    const removeItemFromReceipt = (index) => {
        removeItem(index)
    };

    return (
        <div className={`customer-layout ${highContrast ? 'high-contrast' : ''}`}>
            <div className="top-bar">
                <div className="weather-info">
                    {weather.main
                        ? `College Station: ${(weather.main.temp * 1.8 + 32).toFixed(1)}°F`
                        : 'Loading weather...'}
                </div>
                <button className="employee-login-button" onClick={handleLoginLogout}>
                    {isAuthenticated ? 'Logout' : 'Employee Login'}
                </button>
            </div>

            <div className="content-section">
                <div className="receipt-section-customer">
                    <Receipt
                        receipt={receipt}
                        onRemove={removeItemFromReceipt}
                        applyTax={applyTax}
                        subtotal={subtotal}
                        taxAmount={taxAmount}
                        total={total}
                    />
                    <button
                        className={`checkout-button ${receipt.length === 0 ? 'disabled' : ''}`} 
                        onClick={goToCheckout} 
                        disabled={receipt.length === 0}
                    >
                        Checkout
                    </button>
                </div>

                <div className="button-container">
                    <button onClick={goToBowlPage} className="category-circle">Bowl</button>
                    <button onClick={goToPlatePage} className="category-circle">Plate</button>
                    <button onClick={goToBiggerPlatePage} className="category-circle">Bigger Plate</button>
                    <button onClick={goToAppetizersPage} className="category-circle">Appetizers</button>
                    <button onClick={goToDrinksPage} className="category-circle">Drinks</button>
                    <button onClick={goToAlacartePage} className="category-circle">À la carte</button>
                </div>
            </div>

            <div className="bottom-bar">
                <button onClick={funtionTest}>High Contrast</button>
                <button ref={translateButtonRef} onClick={translatePage} className="translate-button">
                    Google Translate
                </button>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
            </div>
        </div>
    );
};

// Wraps the CustomerView component with the ZoomProvider for zoom context
const WrappedCustomerView = () => (
    <ZoomProvider>
        <CustomerView />
    </ZoomProvider>
);

export default WrappedCustomerView;
