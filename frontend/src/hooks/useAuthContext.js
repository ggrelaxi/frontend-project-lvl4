import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const useIsUserLoggin = () => {
    const { checkIsUserLogin } = useAuthContext();
    const isLogin = checkIsUserLogin();
    return isLogin;
};
