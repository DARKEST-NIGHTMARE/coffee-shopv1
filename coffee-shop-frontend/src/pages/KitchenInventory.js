import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory, selectAllInventoryItems } from '../features/inventorySlice';
import Modal from '../components/common/Modal';
import WasteModal from '../components/dashboard/WasteModal';
import './KitchenInventory.css';

const KitchenInventory = () => {
  const dispatch = useDispatch();
  const inventoryItems = useSelector(selectAllInventoryItems);  
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleOpenWasteModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="kitchen-inventory">
      <div className="ki-header">
        <h2>Kitchen Inventory</h2>
        <button onClick={() => dispatch(fetchInventory())}>Refresh Stock</button>
      </div>

      <div className="ki-grid">
        {inventoryItems.map(item => (
          <div key={item.id} className="ki-card">
            <h3>{item.name}</h3>
            <div className="ki-stock">{item.currentStock.toFixed(1)}</div>
            <div className="ki-unit">{item.unitOfMeasure}</div>
            
            <button 
              className="btn-waste"
              onClick={() => handleOpenWasteModal(item)}
            >
              Report Waste
            </button>
          </div>
        ))}
      </div>
      <Modal 
        show={isModalOpen} 
        onClose={handleCloseModal} 
        title="Report Spoilage / Waste"
      >
        {selectedItem && (
          <WasteModal item={selectedItem} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};

export default KitchenInventory;