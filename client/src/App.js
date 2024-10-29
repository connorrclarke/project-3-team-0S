import React, { useState } from 'react';
import Receipt from './components/Receipt';
import CategoryTabs from './components/CategoryTabs';
import ItemGrid from './components/ItemGrid';
import OrderControls from './components/OrderControls';
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('Bowl');
  const [receipt, setReceipt] = useState([]);
  const [total, setTotal] = useState(0);

  const categories = ['Bowl', 'Plate', 'Bigger Plate', 'Appetizers', 'Drinks'];

  const entrees = [
    "Bourbon Chicken",
    "Orange Chicken",
    "Honey Walnut Shrimp",
    "Teriyaki Chicken",
    "Broccoli Beef",
    "Kung Pao Chicken",
    "Honey Sesame Chicken",
    "Beijing Beef",
    "Sweet Fire Chicken",
    "Mushroom Chicken",
    "String Bean Chicken",
    "Black Pepper Steak"
  ];  
  const sides = ['Chow Mein', 'Fried Rice', 'White Rice', 'Super Greens'];

  const items = {
    Bowl: [...sides, ...entrees],
    Plate: [...sides, ...entrees],
    BiggerPlate: [...sides, ...entrees],
    Appetizers: ['Egg Roll', 'Spring Roll', 'Cream Cheese Rangoon', 'Apple Pie Roll'],
    Drinks: ['Fountain Drink', 'Mexican Coke', 'Apple Juice', 'Water Bottle']
  };

  const addItemToReceipt = (item) => {
    const newItem = { name: item, price: 8.30 }; // Example price
    setReceipt([...receipt, newItem]);
    setTotal(total + newItem.price);
  };

  return (
    <div className="app-container">
      <Receipt receipt={receipt} total={total} />
      <CategoryTabs 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <ItemGrid 
        items={items[selectedCategory]} 
        addItemToReceipt={addItemToReceipt} 
      />
      <OrderControls />
    </div>
  );
};

export default App;
