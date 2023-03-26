import React from 'react';
import { Main } from '../Main';
import { Header } from '../Header';
import { Footer } from '../Footer';
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
