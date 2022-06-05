import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const login = () => {
    // TODO login
  };
  const logout = () => {
    // TODO logout
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: false,
        user: null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
