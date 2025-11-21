import React from 'react';
import './Widgets.css';

const ActionWidget = ({ title, subtitle, icon, bgImage, onClick }) => {
  const widgetStyle = bgImage 
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' } 
    : {};

  return (
    <div 
      className="dashboard-widget action-widget" 
      onClick={onClick}
      style={widgetStyle}
    >
      <div className="action-content">
        {icon}
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default ActionWidget;