import React, { useEffect, useState } from 'react';
import { getOrderHistory } from '../services/apiService';
import './OrderHistory.css'; 

const OrderRow = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTimestamp = (ts) => {
    if (!ts) return 'N/A';
    return new Date(ts).toLocaleString();
  };

  return (
    <>
      <tr className="history-row-main" onClick={() => setIsExpanded(!isExpanded)}>
        <td>#{order.id}</td>
        <td>{order.tableName}</td>
        <td>{formatTimestamp(order.orderTimestamp)}</td>
        <td>
          <span className={`status-${order.status}`}>{order.status}</span>
        </td>
        <td>${order.totalPrice.toFixed(2)}</td>
      </tr>

      {isExpanded && (
        <tr className="history-row-details">
          <td colSpan="5">
            <div>
              <strong>Order Items:</strong>
              <ul className="order-items-list">
                {order.orderItems.map(item => (
                  <li key={item.id}>
                    {item.menuItemName} (x{item.quantity}) at ${item.priceAtOrderTime.toFixed(2)} each
                  </li>
                ))}
              </ul>
              <small>Completed at: {formatTimestamp(order.completedTimestamp)}</small>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await getOrderHistory();
        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch order history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      <div className="table-container">
      
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Table</th>
            <th>Placed At</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default OrderHistory;