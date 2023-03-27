import { useEffect, useCallback } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { urls } from '../../../urls';
import { useAuthContext, useIsUserLoggin } from '../../../hooks/useAuthContext';
import { apiClient } from '../../../api/client';
import { retryTime } from '../../../config';
import { Chat } from '../../pages/Chat/Chat';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { SignupPage } from '../../pages/SignupPage/SignupPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
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
            .then(() => {
                setTimeout(() => isServerOnline(), retryTime);
            })
            .catch(() => {
                logout();
            })
            .finally(() => {});
    }, [logout]);

    useEffect(() => {
        isServerOnline();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route path={urls.mainPage()} element={<AppLayout />}>
                <Route element={<PrivateOutlet />}>
                    <Route index element={<Chat />} />
                </Route>
                <Route path={urls.signUpPage()} element={<SignupPage />} />

                <Route path={urls.loginPage()} element={<LoginPage />} />
                <Route path={urls.notFoundPage()} element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
