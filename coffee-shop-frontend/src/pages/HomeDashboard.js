import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserPermissions, selectUsername } from '../features/authSlice';
import { fetchActiveOrders, selectActiveOrders } from '../features/orderSlice';
import { fetchInventory, selectAllInventoryItems } from '../features/inventorySlice';

import { LuCoffee, LuUtensils, LuTrendingUp, LuUsers } from "react-icons/lu";
import { FiAlertTriangle } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";

import StatWidget from '../components/widgets/StatWidget';
import ActionWidget from '../components/widgets/ActionWidget';
import './HomeDashboard.css';

const HomeDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const permissions = useSelector(selectUserPermissions);
  const username = useSelector(selectUsername);
  const activeOrders = useSelector(selectActiveOrders);
  const inventory = useSelector(selectAllInventoryItems);
  // console.log("active "+activeOrders);

  const hasPerm = (p) => permissions.includes(p);

  useEffect(() => {
    if (hasPerm('ORDER_COOK')) dispatch(fetchActiveOrders());
    if (hasPerm('INVENTORY_READ')) dispatch(fetchInventory());
  }, [dispatch, permissions]);

  const pendingCount = activeOrders.filter(o => o.status === 'PENDING').length;
  const cookingCount = activeOrders.filter(o => o.status === 'IN_PROGRESS').length;
  const lowStockCount = inventory.filter(i => i.currentStock < i.reorderLevel).length;
  // console.log("pending: ",pendingCount, "cook: ",cookingCount);

  return (
    <div className="home-dashboard">
      <header className="home-header">
        <h1>Welcome, {username}!</h1>
        <p>Here is a what you might want</p>
      </header>

      <div className="widget-grid">
        
        {hasPerm('ORDER_CREATE') && (
          <div className="widget-card large-card">
            <ActionWidget 
              title="New Order" 
              subtitle="Create new Orders" 
              icon={<LuCoffee />}
              onClick={() => navigate('/orders')} 
            />
          </div>
        )}

        {hasPerm('ORDER_COOK') && (
          <>
            <StatWidget 
              title="Pending Orders" 
              value={pendingCount} 
              icon={<MdOutlinePendingActions />} 
              color="#007bff"
              onClick={() => navigate('/kitchen')}
            />
            <StatWidget 
              title="Cooking Now" 
              value={cookingCount} 
              icon={<LuUtensils />} 
              color="#ff7b00"
              onClick={() => navigate('/kitchen')}
            />
          </>
        )}

        {hasPerm('INVENTORY_READ') && lowStockCount > 0 && (
          <StatWidget 
            title="Low Stock Alerts" 
            value={lowStockCount} 
            icon={<FiAlertTriangle />} 
            color="#dc3545"
            onClick={() => navigate('/inventory')}
          />
        )}

        {hasPerm('REPORTS_VIEW') && (
          <StatWidget 
            title="View Reports" 
            value="Stats" 
            icon={<LuTrendingUp />} 
            color="#28a745"
            onClick={() => navigate('/reports')}
          />
        )}
        
        {hasPerm('STAFF_MANAGE') && (
          <StatWidget 
            title="Manage Staff" 
            value="Team" 
            icon={<LuUsers />} 
            color="#6c757d"
            onClick={() => navigate('/staff')}
          />
        )}

      </div>
    </div>
  );
};

export default HomeDashboard;