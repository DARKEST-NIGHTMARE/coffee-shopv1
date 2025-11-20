import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../features/authSlice';
import { 
  LuLayoutDashboard, 
  LuClipboardList, 
  LuBookOpen, 
  LuWarehouse, 
  LuChartLine,
  LuUsers,
  LuUtensils,
  LuTrash2
} from "react-icons/lu"; 
import './BottomNav.css';

const BottomNav = () => {
  const userRole = useSelector(selectUserRole);

  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list">
        <li>
          <NavLink to="/dashboard">
            <LuLayoutDashboard />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/order-history">
            <LuClipboardList />
            <span>History</span>
          </NavLink>
        </li>

        
        {userRole === 'ROLE_MANAGER' && (
          <>
            <li>
              <NavLink to="/menu">
                <LuBookOpen />
                <span>Menu</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/inventory">
                <LuWarehouse />
                <span>Stock</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reports">
                <LuChartLine />
                <span>Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff">
                <LuUsers />
                <span>Staff</span>
              </NavLink>
            </li>
          </>
        )}
        {(userRole === 'ROLE_CHEF' || userRole === 'ROLE_MANAGER') && (
            <li>
              <NavLink to="/kitchen">
                <LuUtensils />
                <span>Kitchen</span>
              </NavLink>
            </li>
        )}
        {(userRole === 'ROLE_CHEF') && (
            <li>
              <NavLink to="/kitchen-inventory">
                <LuTrash2 />
                <span>Wastr</span>
              </NavLink>
            </li>
        )}
      </ul>
    </nav>
  );
};

export default BottomNav;