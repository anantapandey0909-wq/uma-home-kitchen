import React, { createContext, useState, useEffect } from 'react';
import { message } from 'antd';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to recover token and session on component mount
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse cached user data from localStorage', error);
        // Clear corrupt state
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);

    // Listen for custom token expiry event from API client interceptor
    const handleSessionExpired = () => {
      setUser(null);
      setToken(null);
      message.error('Session expired. Please login again.');
    };

    window.addEventListener('auth-session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('auth-session-expired', handleSessionExpired);
    };
  }, []);

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
