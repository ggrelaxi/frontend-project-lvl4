import { createContext, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { urls } from '../urls';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')) || null);

    const logout = useCallback(() => {
        window.localStorage.removeItem('user');
        setUser(null);
        navigate(urls.loginPage());
    }, [navigate]);

    const login = useCallback(
        (token, username) => {
            window.localStorage.setItem('user', JSON.stringify({ token, username }));
            setUser({ token, username });
            navigate(urls.mainPage());
        },
        [navigate]
    );

    const checkIsUserLogin = useCallback(() => {
        const userData = JSON.parse(window.localStorage.getItem('user'));
        if (!userData) return false;
        const { token } = userData;

        return !!user || !!token || false;
    }, [user]);

    const contextValue = useMemo(
        () => ({
            login,
            logout,
            checkIsUserLogin,
            user,
        }),
        [user, login, logout, checkIsUserLogin]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
