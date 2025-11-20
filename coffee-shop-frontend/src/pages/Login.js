import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { authService } from '../services/authApi';
import { setCredentials } from '../features/authSlice';
// import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 

    try {
      const response = await axios.post('http://localhost:8084/api/auth/login',
        {
          username,
          password,
        });
      
      // const userData = await authService.login(username, password);
      const userData = response.data
      
      dispatch(setCredentials(userData));
      
      navigate('/dashboard');

    } catch (err) {
      setError('Login failed. Please check your username and password.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Staff Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;