import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStock } from '../features/inventorySlice';

const StockUpdateForm = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const [changeQuantity, setChangeQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (changeQuantity === 0) return; 
    
    dispatch(updateStock({ itemId: item.id, changeQuantity }));
    onClose();
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <h4>{item.name}</h4>
      <p>Current Stock: <strong>{item.currentStock} {item.unitOfMeasure}</strong></p>
      
      <div className="form-group">
        <label>Add Stock (for deliveries)</label>
        <input
          type="number"
          step="0.1"
          value={changeQuantity}
          onChange={(e) => setChangeQuantity(parseFloat(e.target.value))}
          placeholder="e.g., 1000"
        />
        <small>Enter a positive number to add stock (e.g., 1000) or a negative number to record waste (e.g., -50).</small>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-save">Update Stock</button>
      </div>
    </form>
  );
};

export default StockUpdateForm;