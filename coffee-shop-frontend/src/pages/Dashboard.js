import React, { useEffect, useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu, selectAllMenuItems } from '../features/menuSlice';
import { fetchActiveOrders, placeNewOrder } from '../features/orderSlice';

import MenuList from '../components/dashboard/MenuList';
import CurrentOrder from '../components/dashboard/CurrentOrder';
import ActiveOrders from '../components/dashboard/ActiveOrders';
import MenuFilterBar from '../components/dashboard/MenuFilterBar';

import './Dashboard.css'; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector(selectAllMenuItems);

  const [cart, setCart] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchActiveOrders());
  }, [dispatch]);

const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(searchLower) || 
        (item.description && item.description.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, searchTerm, selectedCategory]);


  const handleAddItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const hanleDecreaseItem = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => 
      cartItem.id === item.id);
      if(existingItem.quantity === 1){
        return prevCart.filter((cartItem) => 
        cartItem.id !== item.id);
      }
      return prevCart.map((cartItem) => 
      cartItem.id === item.id
    ?{...cartItem,quantity : cartItem.quantity-1}
  :cartItem);
    });
  };

  // const handleRemoveItem = (itemId) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  // };

  const handlePlaceOrder = (tableName) => {
    const orderData = {
      tableName: tableName,
      items: cart.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
      })),
    };
    
    dispatch(placeNewOrder(orderData));
    setCart([]); 
  };

  return (
    <div className="dashboard">
      <div className="dashboard-column menu-container-column">
      <MenuFilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
              <MenuList 
          items={filteredItems} 
          onAddItem={handleAddItemToCart} 
        />
      </div>
      <div className="dashboard-right-panel">
      <CurrentOrder 
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
        onAddItem={handleAddItemToCart}
        onDecreaseItem={hanleDecreaseItem}
        // onRemoveItem={handleRemoveItem}
      />
      
      <ActiveOrders />
    </div>
    </div>
  );
};

export default Dashboard;