import axios from 'axios';

const API_URL = 'http://localhost:8084/api/auth';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Login failed');
  }
};

const register = async (username, password, role, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        username,
        password,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Registration failed');
  }
};

export const authService = {
  login,
  register,
};