import { Outlet } from 'react-router-dom';
import MainContainer from './main.styled';

const MainBlock = () => (
  <MainContainer>
    <Outlet />
  </MainContainer>
);

export default MainBlock;
