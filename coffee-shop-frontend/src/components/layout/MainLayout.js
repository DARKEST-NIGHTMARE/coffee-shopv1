import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="page-container">
          <Outlet /> 
        </main>
      </div>
      <BottomNav/>
    </div>
  );
};

export default MainLayout;