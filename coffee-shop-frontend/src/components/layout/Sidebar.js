import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserPermissions } from '../../features/authSlice';
import './MainLayout.css';

const Sidebar = () => {
  const permissions = useSelector(selectUserPermissions);
  const hasPerm = (perm) => permissions.includes(perm);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Coffee Shop
      </div>
      <nav>
        <ul>
          {hasPerm('ORDER_CREATE') && (
          <li>
            <NavLink to="/dashboard">Order Tab</NavLink>
          </li>)}
          <li>
            <NavLink to="/order-history">Order History</NavLink>
          </li>

          {/* {userRole === 'ROLE_MANAGER' && (
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
          )} */}
          {hasPerm('ORDER_COOK') && (
            <li>
              <NavLink to="/kitchen">Kitchen Display</NavLink>
            </li>
            
          )}
          {hasPerm('STOCK_ADJUST') && (
            <li>
              <NavLink to="/kitchen-inventory">Kitchen Stock</NavLink>
            </li>
            
          )}
          {/* {(hasPerm('MENU_MANAGE') || hasPerm('STAFF_MANAGE')) && (
             <li className="section-title">Management</li>
          )} */}

          {hasPerm('MENU_MANAGE') && (
            <li><NavLink to="/menu">Menu Mgt.</NavLink></li>
          )}
          {hasPerm('INVENTORY_MANAGE') && (
            <li><NavLink to="/inventory">Inventory Mgt.</NavLink></li>
          )}
          {hasPerm('REPORTS_VIEW') && (
            <li><NavLink to="/reports">Reports</NavLink></li>
          )}
          {hasPerm('STAFF_MANAGE') && (
            <li><NavLink to="/staff">Staff Mgt.</NavLink></li>
          )}
          {hasPerm('ROLE_MANAGE') && (
            <li><NavLink to="/roles">Roles & Perms</NavLink></li>
          )}

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;