import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory, selectAllInventoryItems } from '../features/inventorySlice';
import Modal from '../components/common/Modal';
import InventoryItemForm from './InventoryItemForm';
import StockUpdateForm from './StockUpdateForm';

import './InventoryManagement.css';

const InventoryManagement = () => {
  const dispatch = useDispatch();
  const inventoryItems = useSelector(selectAllInventoryItems);
  //used console
  console.log(inventoryItems);

  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false);
 
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleOpenUpdateStockModal = (item) => {
    setCurrentItem(item);
    setIsUpdateStockModalOpen(true);
  };

  return (
    <div className="inventory-management-container">
      <div className="inventory-management-header">
        <h2>Inventory Management</h2>
        <button onClick={() => setIsNewItemModalOpen(true)}>+ Add New Item Type</button>
      </div>
<div className="table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Stock</th>
            <th>Unit</th>
            <th>Reorder Level</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => {
            const isLow = item.currentStock < item.reorderLevel;
            return (
              <tr key={item.id} className={isLow ? 'low-stock' : ''}>
                <td>{item.name}</td>
                <td>{item.currentStock.toFixed(1)}</td>
                <td>{item.unitOfMeasure}</td>
                <td>{item.reorderLevel.toFixed(1)}</td>
                <td>{isLow ? 'LOW' : 'OK'}</td>
                <td className="actions">
                  <button 
                    className="btn-update-stock" 
                    onClick={() => handleOpenUpdateStockModal(item)}
                  >
                    Update Stock
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <Modal 
        show={isNewItemModalOpen} 
        onClose={() => setIsNewItemModalOpen(false)}
        title="Add New Inventory Item"
      >
        <InventoryItemForm onClose={() => setIsNewItemModalOpen(false)} />
      </Modal>

      {currentItem && (
        <Modal 
          show={isUpdateStockModalOpen} 
          onClose={() => setIsUpdateStockModalOpen(false)}
          title="Update Stock"
        >
          <StockUpdateForm 
            item={currentItem} 
            onClose={() => setIsUpdateStockModalOpen(false)} 
          />
        </Modal>
      )}
    </div>
  );
};

export default InventoryManagement;