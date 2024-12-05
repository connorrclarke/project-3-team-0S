import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';
import Receipt from './ReceiptKiosk';
import {useZoom, ZoomProvider} from "./ZoomContext";



// API details for fetching weather information
const api = {
    key: 'd453e1ec5fc10a70f578d8c724e586cd',
    base: 'https://api.openweathermap.org/data/2.5/'
};

const CustomerView = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const translateButtonRef = useRef(null); // Ref for Google Translate button
    const[weather, setWeather] = useState({}); // State for storing weather data
    const[receipt, setReceipt] = useState([]); // State for storing receipt items
    const applyTax = true; // Flag to indicate if tax should be applied


    // Calculate receipt totals
    const subtotal = receipt.reduce((acc, item) => acc + item.price, 0);
    const taxRate = 0.0825;
    const taxAmount = applyTax ? subtotal * taxRate : 0;
    const total = subtotal + taxAmount;

    const { zoomLevel, updateZoomLevel } = useZoom();

    const handleZoomIn = () => updateZoomLevel(Math.min(zoomLevel + 0.1, 2));
    const handleZoomOut = () => updateZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
    const handleResetZoom = () => updateZoomLevel(1);
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

    /**
     * Dynamically loads the Google Translate script for on-the-fly translation
     * of the page content.
     */
    const translatePage = () => {
        if(!document.querySelector('#google-translate-script')){
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);

            // Initialize Google Translate
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {pageLanguage: 'en'},
                    translateButtonRef.current
                );
            };
        }
        else{
            if(window.googleTranslateElementInit){
                window.googleTranslateElementInit();
            }
        }
    }

    // Navigates to employee login page
    const goToEmployeeLogin = () => {
        navigate('/');
    };

    // Navigates to bowl menu page
    const goToBowlPage = () => {
        navigate('/bowl');
        const newItem = { name: 'Bowl', price: 5.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    // Navigates to plate menu page
    const goToPlatePage = () => {
        navigate('/plate');
        const newItem = { name: 'Plate', price: 7.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    // Navigates to bigger plate menu page
    const goToBiggerPlatePage = () => {
        navigate('/bigger-plate');
        const newItem = { name: 'Bigger Plate', price: 9.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    // Navigates to appetizer menu page
    const goToAppetizersPage = () => {
        navigate('/appetizers');
        const newItem = { name: 'Appetizer', price: 3.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    // Navigates to drinks menu page
    const goToDrinksPage = () => {
        navigate('/drinks');
        const newItem = { name: 'Drink', price: 2.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToAlacartePage = () => {
        navigate('/alacarte');
    }

    // Navigates to checkout page, passing the current receipt and total
    const goToCheckout = () => {
        navigate('/checkout', { state: { receipt, total } });
    };

    /**
     * Removes an item from the receipt by its index.
     *
     * @param {number} index - The index of the item to remove.
     */
    const removeItemFromReceipt = (index) => {
        const updatedReceipt = receipt.filter((_, i) => i !== index);
        setReceipt(updatedReceipt);
    };

    return (
        <div className="customer-layout">
            <div className="top-bar">
                <div className="weather-info">
                    {weather.main
                        ? `College Station: ${(weather.main.temp * 1.8 + 32).toFixed(1)}°F`
                        : 'Loading weather...'}
                </div>
                <button className="employee-login-button" onClick={goToEmployeeLogin}>
                    Employee Login
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
                    <button className="checkout-button" onClick={goToCheckout}>Checkout</button>
                </div>

                <div className="button-container">
                    <button onClick={goToBowlPage} className="category-circle"> Bowl </button>
                    <button onClick={goToPlatePage} className="category-circle"> Plate </button>
                    <button onClick={goToBiggerPlatePage} className="category-circle"> Bigger Plate </button>
                    <button onClick={goToAppetizersPage} className="category-circle"> Appetizers </button>
                    <button onClick={goToDrinksPage} className="category-circle"> Drinks </button>
                    <button onClick={goToAlacartePage} className="category-circle"> À la carte </button>
                </div>
            </div>

            <div className="bottom-bar">
                <button>High Contrast</button>

                <button
                    ref={translateButtonRef}
                    onClick={translatePage}

                    className='translate=button'
                >Google Translate</button>

                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleResetZoom}>Reset Zoom</button>
            </div>
        </div>
    );
};

const WrappedCustomerView = () => (
    <ZoomProvider>
        <CustomerView />
    </ZoomProvider>
);

export default WrappedCustomerView;

