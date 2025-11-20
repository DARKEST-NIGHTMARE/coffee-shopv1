import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewInventoryItem } from '../features/inventorySlice';

const InventoryItemForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('GRAMS');
  const [reorderLevel, setReorderLevel] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = {
      name,
      unitOfMeasure,
      reorderLevel,
      currentStock: 0, 
    };
    dispatch(addNewInventoryItem(itemData));
    onClose();
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Item Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Unit of Measure</label>
        <select
          value={unitOfMeasure}
          onChange={(e) => setUnitOfMeasure(e.target.value)}
        >
          <option value="GRAMS">Grams (g)</option>
          <option value="ML">Milliliters (ml)</option>
          <option value="UNITS">Units (pcs)</option>
        </select>
      </div>
      <div className="form-group">
        <label>Reorder Level</label>
        <input
          type="number"
          step="0.1"
          value={reorderLevel}
          onChange={(e) => setReorderLevel(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-save">Save</button>
      </div>
    </form>
  );
};

export default InventoryItemForm;