import React, { useState } from 'react';

const CurrentOrder = ({ cart, onPlaceOrder, onAddItem, onDecreaseItem }) => {
  const [tableName, setTableName] = useState('');

  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handlePlaceOrder = () => {
    if (!tableName) {
      alert('Please enter a table name or "Takeaway".');
      return;
    }
    onPlaceOrder(tableName);
  };

  return (
    <div className="dashboard-column current-order-column">
      <h3>Current Order</h3>
      <div className="form-group">
        <label htmlFor="table-name">Table Name / Takeaway:</label>
        <input
          type="text"
          id="table-name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="e.g., Table 5 or Takeaway"
        />
      </div>

      <div className="cart-items-list">
        {cart.length === 0 ? (
          <p>Click on a menu item to add it.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="cart-item-name">{item.name }</span>
              <div className="quantity-control">
                <button onClick={() => onDecreaseItem(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onAddItem(item)}>+</button>
              </div>
              {/* <button onClick={() => onRemoveItem(item.id)}>Remove</button> */}
              <span className="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="cart-total">
        Total: ${totalPrice.toFixed(2)}
      </div>
      
      <button 
        className="place-order-btn" 
        onClick={handlePlaceOrder}
        disabled={cart.length === 0 || !tableName}
      >
        Place Order
      </button>
    </div>
  );
};

export default CurrentOrder;