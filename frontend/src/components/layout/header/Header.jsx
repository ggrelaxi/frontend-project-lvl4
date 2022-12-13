import { Link } from 'react-router-dom';
import { HeaderContainer } from './header.styled';
import Logo from '../../../assets/icons/logo.svg';

export const Header = () => {
    return (
        <HeaderContainer>
            <Link to="/">
                <img className="header-logo" src={Logo} alt="logo" />
            </Link>
        </HeaderContainer>
    );
};
