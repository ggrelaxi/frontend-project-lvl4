import { createContext, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(window.localStorage.getItem('token') || false);

    const logout = useCallback(() => {
        window.localStorage.removeItem('token');
        setIsLogin(false);
        navigate('/');
    }, [navigate]);

    const login = useCallback(
        (token) => {
            window.localStorage.setItem('token', token);
            setIsLogin(true);
            navigate('/');
        },
        [navigate]
    );

    const checkIsUserLogin = useCallback(() => {
        const token = window.localStorage.getItem('token');
        return isLogin || !!token || false;
    }, [isLogin]);

    const contextValue = useMemo(
        () => ({
            login,
            logout,
            checkIsUserLogin,
            isLogin,
        }),
        [isLogin, login, logout, checkIsUserLogin]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
