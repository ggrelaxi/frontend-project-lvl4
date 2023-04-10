import {
  createContext, useMemo, useState,
} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload));
    setUser({ username: payload.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  const contextValue = useMemo(() => ({
    user, logIn, logOut, getAuthHeader,
  }), [user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
