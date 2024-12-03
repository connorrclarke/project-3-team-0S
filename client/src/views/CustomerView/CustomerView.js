import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerView.css';
import Receipt from './ReceiptKiosk';

const api = {
    key: 'd453e1ec5fc10a70f578d8c724e586cd',
    base: 'https://api.openweathermap.org/data/2.5/'
};  

const CustomerView = () => {
    const navigate = useNavigate();

    const[weather, setWeather] = useState({});

    useEffect(() => {
        fetch(`${api.base}weather?q=College Station&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
            })
            .catch((error) => console.error('Error fetching weather data:', error));
    }, []);

    const goToEmployeeLogin = () => {
        navigate('/');
    };

    const goToBowlPage = () => {
        navigate('/bowl');
        const newItem = { name: 'Bowl', price: 5.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToPlatePage = () => {
        navigate('/plate');
        const newItem = { name: 'Plate', price: 7.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToBiggerPlatePage = () => {
        navigate('/bigger-plate');
        const newItem = { name: 'Bigger Plate', price: 9.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToAppetizersPage = () => {
        navigate('/appetizers');
        const newItem = { name: 'Appetizer', price: 3.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToDrinksPage = () => {
        navigate('/drinks');
        const newItem = { name: 'Drink', price: 2.99 };
        setReceipt(prevReceipt => [...prevReceipt, newItem]);
    };

    const goToCheckout = () => {
        navigate('/checkout', { state: { receipt, total } });
    };

    const removeItemFromReceipt = (index) => {
        const updatedReceipt = receipt.filter((_, i) => i !== index);
        setReceipt(updatedReceipt);
    };

    const [receipt, setReceipt] = useState([]);
    const applyTax = true;

    const subtotal = receipt.reduce((acc, item) => acc + item.price, 0);
    const taxRate = 0.0825;
    const taxAmount = applyTax ? subtotal * taxRate : 0;
    const total = subtotal + taxAmount;

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
                </div>
            </div>

            <div className="bottom-bar">
                <button>High Contrast</button>
                <button>Google Translate</button>
                <button>Zoom In</button>
                <button>Zoom Out</button>
            </div> 
        </div>
    );
};

export default CustomerView;
