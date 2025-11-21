import React from 'react';
import './Widgets.css';

const StatWidget = ({ title, value, icon, color, onClick }) => {
  return (
    <div className="dashboard-widget stat-widget" onClick={onClick} style={{ borderLeftColor: color }}>
      <div className="widget-icon" style={{ color: color }}>
        {icon}
      </div>
      <div className="widget-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatWidget;