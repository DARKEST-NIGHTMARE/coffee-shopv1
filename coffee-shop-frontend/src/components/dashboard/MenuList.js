import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllMenuItems } from '../../features/menuSlice';

const MenuList = ({ onAddItem }) => {
  const menuItems = useSelector(selectAllMenuItems);

  return (
    <div className="dashboard-column menu-list-column">
      <h3>Menu</h3>
      <div className="menu-list">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="menu-item-card" 
            onClick={() => onAddItem(item)}
          >

            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className="menu-item-image"/>
            )}
            
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            {/* We'll add the image here later! */}
            <div className="price">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;