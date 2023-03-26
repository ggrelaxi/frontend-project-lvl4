import { useEffect, useCallback } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { urls } from '../../../urls';
import { useAuthContext, useIsUserLoggin } from '../../../hooks/useAuthContext';
import { Layout } from '../Layout/Layout';
import { apiClient } from '../../../api/client';
import { retryTime } from '../../../config';
import { Chat } from '../../pages/Chat/Chat';
import { Login } from '../../pages/Login/Login';
import { Signup } from '../../pages/Signup/Signup';
import { NotFound } from '../../pages/NotFound/NotFound';

const PrivateOutlet = () => {
    const isLogin = useIsUserLoggin();

    return isLogin ? <Outlet /> : <Navigate to={urls.loginPage()} />;
};

export const App1 = () => {
    const { logout } = useAuthContext();

    const isServerOnline = useCallback(() => {
        apiClient
            .get(urls.getChatData())
            .then()
            .catch(() => {
                logout();
            });

        setTimeout(() => isServerOnline(), retryTime);
    }, [logout]);

    useEffect(() => {
        isServerOnline();
    }, [isServerOnline]);

    return (
        <Routes>
            <Route path={urls.mainPage()} element={<Layout />}>
                <Route element={<PrivateOutlet />}>
                    <Route index element={<Chat />} />
                </Route>
                <Route path={urls.signUpPage()} element={<Signup />} />

                <Route path={urls.loginPage()} element={<Login />} />
                <Route path={urls.notFoundPage()} element={<NotFound />} />
            </Route>
        </Routes>
    );
};
