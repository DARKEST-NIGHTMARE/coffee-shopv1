import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenu, removeMenuItem, selectAllMenuItems } from '../features/menuSlice';
import { fetchInventory } from '../features/inventorySlice';
import Modal from '../components/common/Modal';
import MenuItemForm from './MenuItemForm';

import './MenuManagement.css'; 

const MenuManagement = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector(selectAllMenuItems);
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); 

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchInventory()); 
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setCurrentItem(null); 
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setCurrentItem(item); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = (menuId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeMenuItem(menuId));
    }
  };

  return (
    <div className="menu-management-container">
      <div className="menu-management-header">
        <h2>Menu Management</h2>
        <button onClick={handleOpenCreateModal}>+ Add New Item</button>
      </div>
<div className="table-container">
      <table className="menu-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.isAvailable ? 'Yes' : 'No'}</td>
              <td className="actions">
                <button className="btn-edit" onClick={() => handleOpenEditModal(item)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <Modal 
        show={isModalOpen} 
        onClose={handleCloseModal}
        title={currentItem ? 'Edit Menu Item' : 'Add New Menu Item'}
      >
        <MenuItemForm 
          currentItem={currentItem} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default MenuManagement;