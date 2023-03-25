import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { HeaderContainer } from './header.styled';
import Logo from '../../../assets/icons/logo.svg';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { urls } from '../../../urls';

export const Header = () => {
    const { logout, user } = useAuthContext();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate(urls.loginPage());
    };

    return (
        <HeaderContainer>
            <Container className="px-2 px-sm-0 px-md-0 px-xl-0">
                <Row className="row justify-content-between">
                    <Col className="col-3">
                        <Link to="/">
                            <img className="header-logo" src={Logo} alt="logo" />
                            <span>{t('common.header.logoText')}</span>
                        </Link>
                    </Col>
                    <Col className="col-2 d-flex justify-content-end">
                        {user && <Button onClick={logoutHandler}>{t('common.header.logoutButton')}</Button>}
                    </Col>
                </Row>
            </Container>
        </HeaderContainer>
    );
};
