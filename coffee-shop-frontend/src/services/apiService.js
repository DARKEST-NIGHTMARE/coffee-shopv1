import axios from 'axios';
// import { store } from '../store'; 


export const api = axios.create({
  baseURL: 'http://localhost:8084/api',
  // baseURL: 'https://gxk3fw5r-8084.inc1.devtunnels.ms/api', 
});

// api.interceptors.request.use(
//   (config) => {
//     const token = store.getState().auth.token;
    
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const getMenuItems = () => api.get('/menu');

export const createMenuItem = (menuItemData) => api.post('/menu', menuItemData);
export const updateMenuItem = (menuId, menuItemData) => api.put(`/menu/${menuId}`, menuItemData);
export const deleteMenuItem = (menuId) => api.delete(`/menu/${menuId}`);



export const getActiveOrders = () => api.get('/orders/active');
export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrderStatus = (orderId, status) => 
  api.put(`/orders/${orderId}/status`, { status });
export const getOrderHistory = () => api.get('/orders/history');

export const getInventoryItems = () => api.get('/inventory');
export const getLowStockItems = () => api.get('/inventory/low-stock'); 
export const addInventoryItem = (itemData) => api.post('/inventory', itemData);
export const updateInventoryStock = (itemId, changeQuantity) => 
  api.put(`/inventory/${itemId}/stock`, { changeQuantity });

export const getSalesReport = (startDate, endDate) => 
  api.get(`/reports/sales?startDate=${startDate}&endDate=${endDate}`);

export const registerUser = (userData) => api.post('/auth/register', userData);
export const getAllStaffUsers = () => api.get('/auth/users');

export const getAllPermissions = () => api.get('roles/permissions');
export const getAllRoles = () => api.get('/roles');
export const createRole = (roleData) => api.post('/roles',roleData);
