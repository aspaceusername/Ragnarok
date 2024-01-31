import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// contexto de autenticação
const AuthContext = createContext();

// autenticação 
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // realizar o login
  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  // realizar o logout
  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/');
  };

  // Fornece as funções
  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// acesso ao contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

