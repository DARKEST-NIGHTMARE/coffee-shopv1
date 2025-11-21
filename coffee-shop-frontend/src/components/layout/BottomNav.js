import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectUserPermissions
} from "../../features/authSlice";
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuBookOpen,
  LuWarehouse,
  LuChartLine,
  LuUsers,
  LuUtensils,
  LuTrash2,
  LuUserPlus,
  LuHouse
} from "react-icons/lu";
import "./BottomNav.css";

const BottomNav = () => {
  const permissions = useSelector(selectUserPermissions);
  const hasPerm = (perm) => permissions.includes(perm);

  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list">
        <li>
          <NavLink to="/dashboard">
          <LuHouse/>
          <span>Home</span>
          </NavLink>
        </li>
        {hasPerm("ORDER_CREATE") && (
          <li>
            <NavLink to="/orders">
              <LuLayoutDashboard />
              <span>Orders</span>
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/order-history">
            <LuClipboardList />
            <span>History</span>
          </NavLink>
        </li>

        {hasPerm("MENU_MANAGE") && (
          <li>
            <NavLink to="/menu">
              <LuBookOpen />
              <span>Menu</span>
            </NavLink>
          </li>
        )}
        {hasPerm("INVENTORY_MANAGE") && (
          <li>
            <NavLink to="/inventory">
              <LuWarehouse />
              <span>Stock</span>
            </NavLink>
          </li>
        )}
        {hasPerm("REPORTS_VIEW") && (
          <li>
            <NavLink to="/reports">
              <LuChartLine />
              <span>Reports</span>
            </NavLink>
          </li>
        )}
        {hasPerm("ROLE_MANAGE") && (
          <li>
            <NavLink to="/roles">
              <LuUserPlus />
              <span>Roles</span>
            </NavLink>
          </li>
        )}
        {hasPerm("STAFF_MANAGE") && (
          <li>
            <NavLink to="/staff">
              <LuUsers />
              <span>Staff</span>
            </NavLink>
          </li>
        )}

        {hasPerm("ORDER_COOK") && (
          <li>
            <NavLink to="/kitchen">
              <LuUtensils />
              <span>Kitchen</span>
            </NavLink>
          </li>
        )}
        {hasPerm("STOCK_ADJUST") && (
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
