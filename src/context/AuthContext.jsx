import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    try {
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      const { data } = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`);
      setUser(null);
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
