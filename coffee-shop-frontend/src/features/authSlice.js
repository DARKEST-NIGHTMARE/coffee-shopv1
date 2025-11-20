import { createSlice } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('userToken') || null;
const userRole = localStorage.getItem('userRole') || null;
const username = localStorage.getItem('username') || null;

const initialState = {
  token: userToken,
  role: userRole,
  user: username,
  isAuthenticated: !!userToken, 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { jwtToken, username, role } = action.payload;

      localStorage.setItem('userToken', jwtToken);
      localStorage.setItem('userRole', role);
      localStorage.setItem('username', username);

      state.token = jwtToken;
      state.user = username;
      state.role = role;
      state.isAuthenticated = true;
    },

    logOut: (state) => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');

      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;
export const selectUsername = (state) => state.auth.user;