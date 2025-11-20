import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStock } from '../../features/inventorySlice';

const WasteModal = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const wasteAmount = parseFloat(amount);
    
    if (!wasteAmount || wasteAmount <= 0) return;

    dispatch(updateStock({ 
      itemId: item.id, 
      changeQuantity: -wasteAmount 
    }));
    
    onClose();
  };

  return (
    <form className="waste-form" onSubmit={handleSubmit}>
      <p>Reporting waste for: <strong>{item.name}</strong></p>
      
      <div className="form-group">
        <label>Amount Wasted ({item.unitOfMeasure})</label>
        <input
          type="number"
          step="0.1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 2.5"
          autoFocus
          required
        />
      </div>

      <div className="waste-warning">
        ⚠ This will deduct <strong>{amount || 0} {item.unitOfMeasure}</strong> from inventory count.
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        <button type="submit" className="btn-delete">Confirm Waste</button>
      </div>
    </form>
  );
};

export default WasteModal;