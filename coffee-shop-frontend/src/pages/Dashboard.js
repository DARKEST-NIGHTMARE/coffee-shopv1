import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMenu } from '../features/menuSlice';
import { fetchActiveOrders, placeNewOrder } from '../features/orderSlice';

import MenuList from '../components/dashboard/MenuList';
import CurrentOrder from '../components/dashboard/CurrentOrder';
import ActiveOrders from '../components/dashboard/ActiveOrders';

import './Dashboard.css'; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchActiveOrders());
  }, [dispatch]);

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
      <MenuList onAddItem={handleAddItemToCart} />
      
      <CurrentOrder 
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
        onAddItem={handleAddItemToCart}
        onDecreaseItem={hanleDecreaseItem}
        // onRemoveItem={handleRemoveItem}
      />
      
      <ActiveOrders />
    </div>
  );
};

export default Dashboard;