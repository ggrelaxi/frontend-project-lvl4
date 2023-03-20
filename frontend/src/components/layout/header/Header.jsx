import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { HeaderContainer } from './header.styled';
import Logo from '../../../assets/icons/logo.svg';
import { useAuthContext } from '../../../hooks/useAuthContext';

export const Header = () => {
    const { logout, isLogin } = useAuthContext();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate('/login');
    };
    console.log(isLogin);
    return (
        <HeaderContainer>
            <Link to="/">
                <img className="header-logo" src={Logo} alt="logo" />
                <span>Hexlet Chat</span>
            </Link>
            {isLogin && <Button onClick={logoutHandler}>Выйти</Button>}
        </HeaderContainer>
    );
};
