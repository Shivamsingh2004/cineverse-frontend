import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    try {

      const { data } = await axios.post(`${API_URL}/users/login`, 
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };
  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/register`, 
        { name, email, password },
        { withCredentials: true }
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem('userInfo');
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWatchlist = async (movie) => {
    if (!user) return { success: false, message: 'Must be logged in' };
    const isInWatchlist = user.watchlist?.some(m => String(m.id) === String(movie.id));
    let updatedWatchlist;
    if (isInWatchlist) {
      updatedWatchlist = user.watchlist.filter(m => String(m.id) !== String(movie.id));
    } else {
      updatedWatchlist = [...(user.watchlist || []), { id: movie.id, title: movie.title || movie.name, poster_path: movie.poster_path }];
    }
    try {
      const { data } = await axios.put(`${API_URL}/users/profile`, 
        { watchlist: updatedWatchlist },
        { withCredentials: true }
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || 'Failed to update watchlist' };
    }
  };

  const toggleFavorite = async (movie) => {
    if (!user) return { success: false, message: 'Must be logged in' };
    const isInFavorites = user.favorites?.some(m => String(m.id) === String(movie.id));
    let updatedFavorites;
    if (isInFavorites) {
      updatedFavorites = user.favorites.filter(m => String(m.id) !== String(movie.id));
    } else {
      updatedFavorites = [...(user.favorites || []), { id: movie.id, title: movie.title || movie.name, poster_path: movie.poster_path }];
    }
    try {
      const { data } = await axios.put(`${API_URL}/users/profile`, 
        { favorites: updatedFavorites },
        { withCredentials: true }
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.response?.data?.message || 'Failed to update favorites' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setUser, toggleWatchlist, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};
