/**
 * CustomerView Component
 *
 * This component provides the user interface for the customer-facing view of the POS system.
 * It allows customers to interact with menu categories, view their receipt, and proceed to checkout.
 * Additionally, it displays real-time weather information and includes accessibility features like
 * Google Translate integration and high-contrast mode.
 *
 * @author Siddhi Mittal
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './CustomerView.css';
import Receipt from './ReceiptKiosk';

// API details for fetching weather information
const api = {
    key: 'd453e1ec5fc10a70f578d8c724e586cd',
    base: 'https://api.openweathermap.org/data/2.5/'
};

const CustomerView = () => {
    const navigate = useNavigate();
    const translateButtonRef = useRef(null);
    const [weather, setWeather] = useState({});
    const [receipt, setReceipt] = useState([]);
    const [highContrast, setHighContrast] = useState(false);
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const applyTax = true;

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
    const goToEmployeeLogin = () => {
        navigate('/login');
    };

    const handleLoginLogout = () => {
        if (isAuthenticated) {
            logout({ returnTo: window.location.origin });
        } else {
            loginWithRedirect();
        }
    };

    //Just in case we need these, they were lost in the merge
    // // Navigates to bowl menu page
    // const goToBowlPage = () => {
    //     navigate('/bowl');
    //     const newItem = { name: 'Bowl', price: 5.99 };
    //     setReceipt(prevReceipt => [...prevReceipt, newItem]);
    // };

    // // Navigates to plate menu page
    // const goToPlatePage = () => {
    //     navigate('/plate');
    //     const newItem = { name: 'Plate', price: 7.99 };
    //     setReceipt(prevReceipt => [...prevReceipt, newItem]);
    // };

    // // Navigates to bigger plate menu page
    // const goToBiggerPlatePage = () => {
    //     navigate('/bigger-plate');
    //     const newItem = { name: 'Bigger Plate', price: 9.99 };
    //     setReceipt(prevReceipt => [...prevReceipt, newItem]);
    // };

    // // Navigates to appetizer menu page
    // const goToAppetizersPage = () => {
    //     navigate('/appetizers');
    //     const newItem = { name: 'Appetizer', price: 3.99 };
    //     setReceipt(prevReceipt => [...prevReceipt, newItem]);
    // };

    // // Navigates to drinks menu page
    // const goToDrinksPage = () => {
    //     navigate('/drinks');
    //     const newItem = { name: 'Drink', price: 2.99 };
    //     setReceipt(prevReceipt => [...prevReceipt, newItem]);
    // };

    const goToBowlPage = () => navigate('/bowl');
    const goToPlatePage = () => navigate('/plate');
    const goToBiggerPlatePage = () => navigate('/bigger-plate');
    const goToAppetizersPage = () => navigate('/appetizers');
    const goToDrinksPage = () => navigate('/drinks');
    const goToAlacartePage = () => navigate('/alacarte');
    const goToCheckout = () => navigate('/checkout', { state: { receipt, total } });

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
                    <button className="checkout-button" onClick={goToCheckout}>
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
                <button>Zoom In</button>
                <button>Zoom Out</button>
            </div>
        </div>
    );
};

export default CustomerView;
