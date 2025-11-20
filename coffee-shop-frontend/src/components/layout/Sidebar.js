import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../features/authSlice';
import './MainLayout.css';

const Sidebar = () => {
  const userRole = useSelector(selectUserRole);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Coffee Shop
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/order-history">Order History</NavLink>
          </li>

          {userRole === 'ROLE_MANAGER' && (
            <>
              <li>
                <NavLink to="/menu">Menu Management</NavLink>
              </li>
              <li>
                <NavLink to="/inventory">Inventory Management</NavLink>
              </li>
              <li>
                <NavLink to="/reports">Reports</NavLink>
              </li>
              <li>
                <NavLink to="/staff">Staff Management</NavLink>
              </li>
            </>
          )}
          {(userRole === 'ROLE_CHEF' || userRole === 'ROLE_MANAGER') && (
            <li>
              <NavLink to="/kitchen">Kitchen Display</NavLink>
            </li>
            
          )}
          {(userRole === 'ROLE_CHEF') && (
            <li>
              <NavLink to="/kitchen-inventory">Kitchen Stock</NavLink>
            </li>
            
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;