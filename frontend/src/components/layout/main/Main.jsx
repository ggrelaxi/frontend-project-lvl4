import { Outlet } from 'react-router-dom';
import { MainContainer } from './main.styled';

export const Main = () => {
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};
