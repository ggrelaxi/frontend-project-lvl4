import React from 'react';
import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { LayoutContainer } from './layout.styled';

export const AppLayout = () => {
    return (
        <LayoutContainer className="bg-light">
            <Header className="bg-white" />
            <Main />
            <Footer className="bg-white" />
        </LayoutContainer>
    );
};
