import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveOrders, updateOrder } from "../../features/orderSlice";
import { selectUserRole } from "../../features/authSlice";

const ActiveOrders = () => {
  const dispatch = useDispatch();
  const activeOrders = useSelector(selectActiveOrders);
  const userRole = useSelector(selectUserRole);

  const handleStartOrder = (orderId) => {
    dispatch(updateOrder({ orderId, status: "IN_PROGRESS" }));
  };

  const handleCompleteOrder = (orderId) => {
    dispatch(updateOrder({ orderId, status: "COMPLETED" }));
  };

  return (
    <div className="dashboard-column active-orders-column">
      <h3>Active Orders</h3>
      <div className="order-card-list">
        {activeOrders.length === 0 && <p>No active orders.</p>}
        {activeOrders.map((order) => {
          const canComplete =
            userRole === "ROLE_MANAGER" ||
            (userRole === "ROLE_BARISTA" && order.status === "PREPARED");
          return (
            <div key={order.id} className={`order-card ${order.status}`}>
              <h4>
                Order #{order.id} ({order.tableName})
              </h4>
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    {item.menuItemName} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
              <div className="order-card-buttons">
                {order.status === "PENDING" && (
                  <button onClick={() => handleStartOrder(order.id)}>
                    Start Order
                  </button>
                )}
                {/* {order.status === 'IN_PROGRESS' && (
                <button onClick={() => handleCompleteOrder(order.id)}>
                  Complete Order
                </button>
              )} */}

                {order.status !== "COMPLETED" && (
                    <button
                      onClick={() => handleCompleteOrder(order.id)}
                      disabled={!canComplete}
                      style={{
                        opacity: canComplete ? 1 : 0.5,
                        cursor: canComplete ? "pointer" : "not-allowed",
                      }}
                    >
                      {order.status === "PREPARED"
                        ? "Serve Order"
                        : "Complete Order"}
                    </button>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveOrders;
