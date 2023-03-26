import { useEffect, useCallback } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { urls } from '../../../urls';
import { useAuthContext, useIsUserLoggin } from '../../../hooks/useAuthContext';
import { apiClient } from '../../../api/client';
import { retryTime } from '../../../config';
import { Chat } from '../../pages/Chat/Chat';
import { Login } from '../../pages/Login/Login';
import { Signup } from '../../pages/Signup/Signup';
import { NotFound } from '../../pages/NotFound/NotFound';
import { AppLayout } from '../AppLayout/AppLayout';

const PrivateOutlet = () => {
    const isLogin = useIsUserLoggin();

    return isLogin ? <Outlet /> : <Navigate to={urls.loginPage()} />;
};

export const Application = () => {
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
            <Route path={urls.mainPage()} element={<AppLayout />}>
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
