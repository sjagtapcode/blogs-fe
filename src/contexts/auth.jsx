import { createContext, useContext, useState } from 'react';
import axiosInstance from '../services/axiosInstance';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// TODO : persist login
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(false);
  const login = async ({ email, password }) => {
    console.log('email: ', email);
    console.log('password: ', password);
    const res = await axiosInstance.post('/login', {
      email,
      password,
    });
    const { accessToken, name, id, email: resEmail } = res?.data;
    if (accessToken) {
      // login success
      setUser({
        name,
        email: resEmail,
        id,
        accessToken,
      });
      setAuthentication(true);

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          name,
          email: resEmail,
          id,
          accessToken,
        })
      );
    }
    return res;
  };
  const logout = () => {
    localStorage.removeItem('token');
    setAuthentication(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
