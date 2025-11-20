import { createSlice } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('userToken') || null;
const userRole = localStorage.getItem('userRole') || null;
const username = localStorage.getItem('username') || null;

const loadPermissions = () => {
  try{
    const stored = localStorage.getItem('permissions');
    return stored ? JSON.parse(stored) : [];
  }
  catch(err){
    return [];
  }
}

const initialState = {
  token: localStorage.getItem('userToken') || null,
  role: localStorage.getItem('userRole') || null,
  user: localStorage.getItem('username') || null,
  permissions: loadPermissions(),
  isAuthenticated: !!localStorage.getItem('userToken'), 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { jwtToken, username, roleName,permissions } = action.payload;

      localStorage.setItem('userToken', jwtToken);
      localStorage.setItem('userRole', roleName);
      localStorage.setItem('username', username);
      localStorage.setItem('permissions',JSON.stringify(permissions));

      state.token = jwtToken;
      state.user = username;
      state.role = roleName;
      state.permissions = permissions;
      state.isAuthenticated = true;
    },

    logOut: (state) => {
      localStorage.clear();
      // localStorage.removeItem('userToken');
      // localStorage.removeItem('userRole');
      // localStorage.removeItem('username');

      state.token = null;
      state.user = null;
      state.role = null;
      state.permissions = [];
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;
export const selectUsername = (state) => state.auth.user;
export const selectUserPermissions = (state) => state.auth.permissions || [];