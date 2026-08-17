import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('vms_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('vms_user');
    const storedToken = localStorage.getItem('vms_token');

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch {
        localStorage.removeItem('vms_user');
        localStorage.removeItem('vms_token');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (authData) => {
    const userInfo = {
      userId: authData.userId,
      name: authData.name,
      email: authData.email,
      role: authData.role,
    };
    setUser(userInfo);
    setToken(authData.token);
    localStorage.setItem('vms_token', authData.token);
    localStorage.setItem('vms_user', JSON.stringify(userInfo));
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('vms_token');
    localStorage.removeItem('vms_user');
  };

  const isAdmin = user?.role === 'Admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, loginUser, logoutUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
