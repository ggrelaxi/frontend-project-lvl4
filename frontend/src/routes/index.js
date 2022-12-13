import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppSpinner } from '../components/common/appSpinner';
import { AppLayout } from '../components/layout/appLayout';
import { MainPage } from '../components/pages/mainPage';
import { NotFound } from '../components/pages/notFound';
import { Login } from '../components/pages/login';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<AppSpinner />}>
                        <AppLayout />
                    </Suspense>
                }
            >
                <Route index element={<MainPage />} />
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<AppSpinner />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<NotFound />}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};
