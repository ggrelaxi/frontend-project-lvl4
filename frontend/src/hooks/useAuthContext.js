import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuthContext = () => useContext(AuthContext);

export const useIsUserLoggin = () => {
  const { checkIsUserLogin } = useAuthContext();

  return checkIsUserLogin();
};
