import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectAllMenuItems } from '../../features/menuSlice';

const MenuList = ({items, onAddItem }) => {
  // const menuItems = useSelector(selectAllMenuItems);
if (items.length === 0) {
    return (
      <div className="dashboard-column menu-list-column">
        <div className="empty-menu-state">
          <p>No items found matching your search.</p>
        </div>
      </div>
    );
  }

  return (
    // <div className="dashboard-column menu-list-column">
    //   <h3>Menu</h3>
    //   <div className="menu-list">
    //     {menuItems.map((item) => (
    //       <div 
    //         key={item.id} 
    //         className="menu-item-card" 
    //         onClick={() => onAddItem(item)}
    //       >

    //         {item.imageUrl && (
    //           <img src={item.imageUrl} alt={item.name} className="menu-item-image"/>
    //         )}
            
    //         <h4>{item.name}</h4>
    //         <p>{item.description}</p>
    //         {/* We'll add the image here later! */}
    //         <div className="price">${item.price}</div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="dashboard-column menu-list-column">
      <div className="menu-list">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="menu-item-card" 
            onClick={() => onAddItem(item)}
          >
            <div className="card-image-container">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="menu-item-image"/>
              ) : (
                <div className="placeholder-image">{item.name.charAt(0)}</div>
              )}
              <div className="add-overlay">+</div>
            </div>
            
            <div className="card-content">
              <div className="card-header-row">
                <h4>{item.name}</h4>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
              <p className="description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;