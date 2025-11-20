import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActiveOrders, updateOrder, selectActiveOrders } from '../features/orderSlice';
import './KitchenDashboard.css';

const KitchenDashboard = () => {
  const dispatch = useDispatch();
  const activeOrders = useSelector(selectActiveOrders);
  
  const [, setTick] = useState(0);

  useEffect(() => {
    dispatch(fetchActiveOrders());
    
    const dataInterval = setInterval(() => {
      dispatch(fetchActiveOrders());
    }, 15000); 

    const timerInterval = setInterval(() => {
      setTick(t => t + 1); 
    }, 60000); 

    return () => {
      clearInterval(dataInterval);
      clearInterval(timerInterval);
    };
  }, [dispatch]);

  const getTimeElapsed = (timestamp) => {
    const diff = new Date() - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    return minutes;
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrder({ orderId, status: newStatus }));
  };

  const kitchenOrders = activeOrders.filter(order => 
    order.status === 'PENDING' || order.status === 'IN_PROGRESS'
  );

  return (
    <div className="kitchen-dashboard">
      <header className="kds-top-bar">
        <h2>Order Requests</h2>
        <span className="live-indicator">● LIVE</span>
      </header>
      
      <div className="kds-grid">
        {kitchenOrders.length === 0 ? (
          <div className="no-orders">
            <h3>All Caught Up!</h3>
            <p>No active orders pending preparation.</p>
          </div>
        ) : (
          kitchenOrders.map(order => {
            const mins = getTimeElapsed(order.orderTimestamp);
            const isLate = mins > 10; 

            return (
              <div key={order.id} className={`kds-card ${order.status} ${isLate ? 'late' : ''}`}>
                <div className="kds-card-header">
                  <div className="order-info">
                    <span className="order-id">#{order.id}</span>
                    <span className="table-name">{order.tableName}</span>
                  </div>
                  <div className="timer-badge">
                    {mins} min
                  </div>
                </div>
                
                <div className="kds-card-body">
                  <ul className="kds-items">
                    {order.orderItems.map(item => (
                      <li key={item.id}>
                        <span className="qty">{item.quantity}</span>
                        <span className="item-name">{item.menuItemName}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="kds-card-footer">
                  {order.status === 'PENDING' && (
                    <button 
                      className="btn-action btn-start"
                      onClick={() => handleStatusChange(order.id, 'IN_PROGRESS')}
                    >
                      Start Cooking
                    </button>
                  )}
                  {order.status === 'IN_PROGRESS' && (
                    <button 
                      className="btn-action btn-ready"
                      onClick={() => handleStatusChange(order.id, 'PREPARED')}
                    >
                        
                      Mark Prepared
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default KitchenDashboard;