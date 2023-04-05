import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import urls from '../../../urls';
import { useIsUserLoggin } from '../../../hooks/useAuthContext';
import Chat from '../../pages/Chat/Chat';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import AppLayout from '../AppLayout/AppLayout';

const PrivateOutlet = () => {
  const isLogin = useIsUserLoggin();

  return isLogin ? <Outlet /> : <Navigate to={urls.loginPage()} />;
};

const Application = () => (
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

export default Application;
