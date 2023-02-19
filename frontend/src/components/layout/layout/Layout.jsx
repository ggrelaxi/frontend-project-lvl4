import React from 'react';
import { Main } from '../main';
import { Header } from '../header';
import { Footer } from '../footer';
import { LayoutContainer } from './layout.styled';

export const Layout = () => {
    return (
        <LayoutContainer>
            <Header />
            <Main />
            <Footer />
        </LayoutContainer>
    );
};
