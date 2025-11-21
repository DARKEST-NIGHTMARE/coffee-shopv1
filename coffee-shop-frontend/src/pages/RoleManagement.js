import React, { useEffect, useState } from 'react';
import { getAllPermissions, createRole, getAllRoles } from '../services/apiService';
import './RoleManagement.css';

const RoleManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [existingRoles, setExistingRoles] = useState([]);
  
  const [roleName, setRoleName] = useState('');
  const [selectedPerms, setSelectedPerms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [permRes, roleRes] = await Promise.all([
        getAllPermissions(),
        getAllRoles()
      ]);
      setPermissions(permRes.data);
      setExistingRoles(roleRes.data);
    } catch (err) {
      console.error("Failed to load role data", err);
    }
  };

  const togglePermission = (permKey) => {
    if (selectedPerms.includes(permKey)) {
      setSelectedPerms(prev => prev.filter(p => p !== permKey));
    } else {
      setSelectedPerms(prev => [...prev, permKey]);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    if (!roleName || selectedPerms.length === 0) {
      alert("please enter name and atleast one permission");
      return;
    }

    try {
      await createRole({
        name: roleName,
        permissions: selectedPerms
      });
      alert("Role Created!");
      setRoleName('');
      setSelectedPerms([]);
      fetchData(); 
    } catch (err) {
      alert("Error creating role. Name might be taken.");
    }
  };

  return (
    <div className="role-management-container">
      <h2>Role Management</h2>

      <div className="role-creator">
        <h3>Create New Role</h3>
        <form onSubmit={handleCreateRole}>
          <input 
            className="role-input"
            type="text" 
            placeholder="Role Name (e.g., 'Shift Barista', 'Inventory Manager')"
            value={roleName}
            onChange={e => setRoleName(e.target.value)}
          />

          <h4>Assign Permissions</h4>
          <div className="permissions-grid">
            {permissions.map(p => (
              <label 
                key={p.key} 
                className={`perm-card ${selectedPerms.includes(p.key) ? 'selected' : ''}`}
              >
                <input 
                  type="checkbox" 
                  checked={selectedPerms.includes(p.key)}
                  onChange={() => togglePermission(p.key)}
                />
                <div>
                  <strong>{p.key}</strong>
                  <br/>
                  <small>{p.description}</small>
                </div>
              </label>
            ))}
          </div>

          <button type="submit" className="btn-save  ">Save New Role</button>
        </form>
      </div>

      <div className="existing-roles">
        <h3>Existing Roles</h3>
        <ul className="existing-roles-list">
          {existingRoles.map(role => (
            <li key={role.id} className="existing-role-item">
              <div>
                <span className="role-name"><strong>{role.name}</strong></span>
                <br/>
                <small>{role.permissions.length} Permissions</small>
              </div>
              <button className="btn-cancel" disabled>Edit (disabled)</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoleManagement;
