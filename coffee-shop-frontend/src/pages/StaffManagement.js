import React, { useEffect, useState } from 'react';
import { getAllStaffUsers, registerUser } from '../services/apiService';
import './StaffManagement.css';

const StaffManagement = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'ROLE_BARISTA', 
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [users,setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    try{
        const response = await getAllStaffUsers();
        setUsers(response.data);
    }
    catch(error){
        console.error("failed to fetch users",error);

    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      await registerUser(formData);
      
      setMessage({ type: 'success', text: 'User registered successfully!' });
      setFormData({
        username: '',
        password: '',
        role: 'ROLE_BARISTA',
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
      setMessage({ 
        type: 'error', 
        text: 'Registration failed. Username might already exist.' 
      });
    }
  };

  return (
    <div className="staff-management-container">
      <h2>Staff Management</h2>

      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="e.g., barista_john"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Strong password"
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="ROLE_BARISTA">Barista</option>
            <option value="ROLE_MANAGER">Manager</option>
            <option value="ROLE_CHEF">Chef</option>
          </select>
        </div>

        <button type="submit">Register New Staff</button>
      </form>
      <div className="staff-list-section">
        <h3>Current Staff</h3>
        <div className="table-container">
          <table className="staff-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role.replace('ROLE_', '')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;