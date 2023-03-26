import { Outlet } from 'react-router-dom';
import { MainContainer } from './main.styled';

export const MainBlock = () => {
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};
