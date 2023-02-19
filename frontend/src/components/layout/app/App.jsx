import { Suspense, lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AppSpinner } from '../../common/appSpinner';
import { urls } from '../../../urls';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Layout } from '../layout/Layout';
import { apiClient } from '../../../api/client';
import { retryTime } from '../../../config';

const LoginPage = lazy(() => import('../../pages/login/Login'));
const MainPage = lazy(() => import('../../pages/main/Main'));
const NotFoundPage = lazy(() => import('../../pages/notFound/NotFound'));

const PrivateOutlet = () => {
    const { isLogin, logout } = useAuthContext();

    const isServerOnline = () => {
        apiClient
            .get(urls.getStartPage())
            .then()
            .catch(() => {
                logout();
            });

        setTimeout(() => isServerOnline(), retryTime);
    };

    isServerOnline();

    return isLogin ? <Outlet /> : <Navigate to={urls.loginPage()} />;
};

export const App = () => {
    return (
        <Routes>
            <Route path={urls.mainPage()} element={<Layout />}>
                <Route element={<PrivateOutlet />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<AppSpinner />}>
                                <MainPage />
                            </Suspense>
                        }
                    />
                </Route>
                <Route
                    path={urls.loginPage()}
                    element={
                        <Suspense fallback={<AppSpinner />}>
                            <LoginPage />
                        </Suspense>
                    }
                />
                <Route
                    path={urls.notFoundPage()}
                    element={
                        <Suspense fallback={<AppSpinner />}>
                            <NotFoundPage />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};
