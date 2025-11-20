import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut, selectUsername } from '../../features/authSlice';
import './MainLayout.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUsername);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <header className="header">
      <span className="user-info">
        Hello, <strong>{username}</strong>
      </span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;