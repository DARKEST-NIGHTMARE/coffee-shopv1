import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated,selectUserRole } from './features/authSlice';

import MainLayout from './components/layout/MainLayout'; 

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import InventoryManagement from './pages/InventoryManagement';
import OrderHistory from './pages/OrderHistory';
import Reports from './pages/Report'

import StaffManagement from './pages/StaffManagement';

import KitchenDashboard from './pages/KitchenDashboard'
import KitchenInventory from './pages/KitchenInventory';
import './App.css';

// const OrderHistory = () => <h2>Order History</h2>;
// const Reports = () => <h2>Reports</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ManagerRoute = ({ children }) => {
  const userRole = useSelector(selectUserRole);
  if (userRole !== 'ROLE_MANAGER') {
    return <Navigate to="/dashboard" replace />; 
  }
  return children;
};

const ChefRoute = ({ children }) => {
  const userRole = useSelector(selectUserRole);
  if (userRole !== 'ROLE_CHEF' && userRole !== 'ROLE_MANAGER') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// const Dashboard = () => <h2>Dashboard Page</h2>;
// const MenuManagement = () => <h2>Menu Management Page</h2>;
// const InventoryManagement = () => <h2>Inventory Management Page</h2>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/" 
          element={<ProtectedRoute><MainLayout /></ProtectedRoute>}
        >
         
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="order-history" element={<OrderHistory />} />

          
          <Route 
            path="menu" 
            element={<ManagerRoute><MenuManagement /></ManagerRoute>} 
          />
          <Route 
            path="inventory" 
            element={<ManagerRoute><InventoryManagement /></ManagerRoute>} 
          />
          <Route 
            path="reports" 
            element={<ManagerRoute><Reports /></ManagerRoute>} 
          />
          <Route 
            path="kitchen" 
            element={<ChefRoute><KitchenDashboard /></ChefRoute>} 
          />
          <Route 
            path="kitchen-inventory" 
            element={<ChefRoute><KitchenInventory /></ChefRoute>} 
          />
        
        <Route 
            path="staff" 
            element={<ManagerRoute><StaffManagement /></ManagerRoute>} 
          />
        </Route>

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;