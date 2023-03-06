import { createContext, useMemo } from 'react';

export const AuthContext = createContext();

const login = (token) => {
    window.localStorage.setItem('token', token);
};

const logout = () => {
    window.localStorage.removeItem('token');
};

const checkIsUserLogin = () => {
    const token = window.localStorage.getItem('token');
    return !!token || false;
};

export const AuthContextProvider = ({ children }) => {
    const isLogin = checkIsUserLogin();
    const contextValue = useMemo(() => {
        return { login, logout, checkIsUserLogin, isLogin };
    }, [isLogin]);

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
